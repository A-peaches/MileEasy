package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.MileByAge;
import com.kbstar.mileEasy.beans.MileByJob;
import com.kbstar.mileEasy.beans.MileByPosition;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.mapper.MileageDao;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/mileage")
public class MileageController {

    @Autowired
    private BestBranchService bestBranchService;
    @Autowired
    private BestPgService bestPgService;
    @Autowired
    private CSService csService;
    @Autowired
    private HotTipService hotTipService;
    @Autowired
    private HrdService hrdService;
    @Autowired
    private LeagueTableService leagueTableService;
    @Autowired
    private MonthlyBaseService monthlyBaseService;
    @Autowired
    private MonthlyBestService monthlyBestService;
    @Autowired
    private MyMileageService myMileageService;
    @Autowired
    private HitMileService hitMileService;
    @Autowired
    private MileHistoryService mileHistoryService;
    @Autowired
    private MileScoreService mileScoreService;
    @Autowired
    private MileService mileService;

    // 파일 업로드 경로
    @Value("${project.uploadpath.mileScore}")
    private String mileScoreUploadPath;
    @Value("${project.uploadpath.document}")
    private String documentUploadPath;
    @Autowired
    private MileageDao mileageDao;

    //마일리지 테이블 가지고오기
    @GetMapping("/getMileage")
    public ArrayList<Mileage> getMileage() {
        ArrayList<Mileage> mileList = mileService.getMileage();
        System.out.println(mileList);
        return mileList;
    }

    @GetMapping("/getMileScore/{user_no}")
    public ArrayList<MileScore> getMileScore(@PathVariable String user_no) {
        ArrayList<MileScore> mileScoreList = mileScoreService.getMileScore(user_no);
        System.out.println(mileScoreList);
        return mileScoreList;
    }

    //페이지별 방문자수 처리
    @GetMapping("hit_mile/{mile_no}")
    public void hit_mile(@PathVariable String mile_no) {
        hitMileService.hitMile(mile_no);
    }


    //마일리지 추천멘트!
    @GetMapping("getRecommand/{user_no}")
    public MileRecommand getRecommand(@PathVariable String user_no) {
        MileRecommand recommands = mileService.getRecommand(user_no);
        return recommands;
    }

    // 마일리지 점수 엑셀파일 업로드
    // 엑셀파일에서 상세항목, 상세항목별 점수, 총 점수를 추출하여 mile_score 테이블에 insert하고, 기존 mile_score 데이터들은 mile_history로 옮긴다
    @PostMapping("/uploadExcel")
    public ResponseEntity<?> uploadExcel(@RequestParam("mile_no") String mile_no,
                                         @RequestParam(value="file", required = false) MultipartFile file
    ){
        try{
            String mile_excel_file = null; // 파일 경로를 저장할 변수를 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = mileScoreUploadPath;

                // 파일 저장
                mile_excel_file = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, mile_excel_file); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다

                // 파일명이 중복될 경우 서버 내부적으로 파일명 변경
                String newFileName = mile_excel_file;
                int count = 1;
                while(Files.exists(path)){
                    int dotIndex = mile_excel_file.lastIndexOf(".");
                    String nameWithoutExtension = (dotIndex == -1) ? mile_excel_file : mile_excel_file.substring(0, dotIndex);
                    String extension = (dotIndex == -1) ? "" : mile_excel_file.substring(dotIndex);
                    newFileName = nameWithoutExtension + "_" + count + extension;
                    path = Paths.get(uploadPath, newFileName);
                    count++;
                }

                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장

                // 엑셀 파일 데이터 추출
                FileInputStream fis = new FileInputStream(new File(uploadPath, newFileName));
                Workbook workbook = new XSSFWorkbook(fis);
                Sheet sheet = workbook.getSheetAt(0); // 첫번째 시트만 처리

                // mile_score_date 추출(A1 셀 값)
                Cell cell = sheet.getRow(0).getCell(0);
                String mile_score_date="";

                if(cell != null){
                    CellType cellType = cell.getCellType();

                    if (cell.getCellType() == CellType.NUMERIC) {
                        if (DateUtil.isCellDateFormatted(cell)) {
                            // 셀이 날짜 형식인 경우
                            Date date = cell.getDateCellValue();
                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                            mile_score_date = dateFormat.format(date);
                        } else {
                            // 셀이 숫자 형식인 경우
                            Date date = DateUtil.getJavaDate(cell.getNumericCellValue());
                            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                            mile_score_date = dateFormat.format(date);
                        }
                    } else if (cell.getCellType() == CellType.STRING) {
                        // 셀이 문자열 형식인 경우
                        String cellValue = cell.getStringCellValue();
                        if (cellValue.matches("\\d{4}-\\d{2}-\\d{2}")) {
                            mile_score_date = cellValue;
                        } else {
                            throw new IllegalStateException("String cell is not in date format.");
                        }
                    } else {
                        // 기타 셀 형식 처리
                        throw new IllegalStateException("지원하지 않는 날짜 형식입니다.");
                    }
                }

                try {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    dateFormat.setLenient(false);
                    Date parsedDate = dateFormat.parse(mile_score_date);

                    // 현재 날짜와 비교
                    if (parsedDate.after(new Date())) {
                        throw new IllegalArgumentException("Future date is not allowed");
                    }

                    // 1900년 이전의 날짜는 거부
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(parsedDate);
                    if (cal.get(Calendar.YEAR) < 1900) {
                        throw new IllegalArgumentException("Date before 1900 is not allowed");
                    }
                } catch (ParseException e) {
                    throw new IllegalArgumentException("Invalid date format: " + mile_score_date);
                }

                // 제목행 추출(두번째 행)
                Row titleRow = sheet.getRow(1);
                if (titleRow == null) {
                    throw new IllegalStateException("Title row is null");
                }
                System.out.println("Title Row Physical Number of Cells: " + titleRow.getPhysicalNumberOfCells());
                System.out.println("Title Row Last Cell Num: " + titleRow.getLastCellNum());

                List<String> mile_score_names = new ArrayList<>();
                for(int i=2; i<titleRow.getLastCellNum(); i++){
                    Cell titleCell = titleRow.getCell(i);
                    if (titleCell == null) {
                        System.out.println("Title cell is null at index: " + i);
                        continue;
                    }
                    mile_score_names.add(titleRow.getCell(i).getStringCellValue());
                }

                // 데이터 행 추출
                List<Map<String, Object>> mile_scores = new ArrayList<>();
                for(int i=2; i<=sheet.getLastRowNum(); i++){ // 세번째 행부터 데이터 행부터 엑셀 시트의 마지막 행까지 반복
                    Row row = sheet.getRow(i); // 인덱스 i에 해당하는 행을 가져온다.
                    if(row != null){ // 만약 null이면 빈 행이므로 건너뛴다.
                        Map<String, Object> mile_score = new HashMap<>();
                        mile_score.put("user_no", (int)row.getCell(0).getNumericCellValue()); // 첫번째 열은 user_no. double을 반환하므로 int로 캐스팅
                        mile_score.put("total_score", (int)row.getCell(1).getNumericCellValue()); // 두번째 열은 총 점수
                        mile_score.put("mile_no", mile_no); // 외부에서 전달된 mile_no을 저장
                        mile_score.put("mile_score_date", mile_score_date);

                        List<Integer> scores = new ArrayList<>(); // 각 상세항목의 점수를 저장할 리스트를 생성
                        for(int j=2; j<row.getPhysicalNumberOfCells(); j++){ // 세번째 열부터 현재 행의 마지막 셀까지 반복
                            scores.add((int)row.getCell(j).getNumericCellValue()); // scores 리스트에 추가한다.
                        }
                        mile_score.put("scores", scores); // scores 리스트를 맵에 추가
                        mile_scores.add(mile_score); // 1개의 행에 대한 데이터가 들어있는 mile_score 맵을 mile_scores 리스트에 저장
                    }
                }
                workbook.close();

                // 서비스 계층 호출
                mileScoreService.addMileScore(mile_scores, mile_score_names, mile_no); // 마일리지 점수 insert
                mileScoreService.addMileExcel(mile_no, mile_excel_file); // 엑셀 파일 insert

                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "마일리지 점수 등록 실패"));
            }
        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }
    }

    // mileExcelFiles 마일리지 점수 엑셀파일 리스트 가져오기 (매개변수: 선택된 날짜, mile_no, page, itemsPerPage)
    @GetMapping("/mileExcelFiles")
    public List<MileExcel> mileExcelFiles(
            @RequestParam("date") String date,
            @RequestParam("mile_no") String mile_no,
            @RequestParam int page,
            @RequestParam int itemsPerPage
    ){
        int offset = (page - 1) * itemsPerPage;
        int limit = itemsPerPage;
        String selectedDate = date.split("T")[0]; // yyyy-MM-dd 형식으로 변환
        List<MileExcel> mileExcelList = mileScoreService.getMileExcel(selectedDate, mile_no, limit, offset);
        return mileExcelList;
    }

    // totalMileExcel 마일리지 점수 엑셀파일 리스트 가져오기 (매개변수: mile_no, page, itemsPerPage)
    @GetMapping("/totalMileExcel/{mile_no}")
    public List<MileExcel> totalMileExcel(
            @PathVariable String mile_no,
            @RequestParam int page,
            @RequestParam int itemsPerPage)
    {
        int offset = (page - 1) * itemsPerPage;
        int limit = itemsPerPage;
        List<MileExcel> mileExcelList = mileScoreService.totalExcel(mile_no, limit, offset);
        return mileExcelList;
    }

    // countList 마일리지 점수 엑셀파일 총 개수 가져오기(매개변수: mile_no)
    @GetMapping("/countList/{mile_no}")
    public int countList(@PathVariable String mile_no){
        return mileScoreService.getCount(mile_no);
    }

    // countListDocuments 마일리지 문서 파일 총 개수 가져오기(매개변수: mile_no)
    @GetMapping("/countListDocuments/{mile_no}")
    public int countListDocuments(@PathVariable String mile_no){
        return mileScoreService.getCountDocuments(mile_no);
    }

    // downloadExcelFile 마일리지 점수 엑셀파일 다운로드 (매개변수: 엑셀 파일 명)
    @GetMapping("/downloadExcelFile/{mile_excel_file}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String mile_excel_file){ // ResponseEntity<Resource> : HTTP 응답으로 리소스를 반환
        try{
            // miledetailUploadPath를 기준으로 mile_route 경로를 결합하여 파일의 절대 경로를 만든다.
            Path filePath = Paths.get(mileScoreUploadPath).resolve(mile_excel_file).normalize(); // normalize()는 불필요한 . 및 .. 경로 요소를 제거

            // 파일 경로를 URL로 변환. 이를 기반으로 UrlResource 객체를 생성.
            Resource resource = new UrlResource(filePath.toUri()); // UrlResource는 파일 시스템의 파일을 나타내는 리소스

            if(resource.exists()){
                // 파일 이름을 UTF-8 인코딩하여 한글, 특수 문자 등 포함 가능
                String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
                System.out.println("서버에 저장된 다운로드 할 파일명"+encodedFileName);
                // 인코딩된 파일 이름을 사용하여 CONTENT_DISPOSITION 헤더 설정. filename* 속성은 UTF-8로 인코딩된 파일 이름을 지원
                String contentDisposition = String.format("attachment; filename*=UTF-8''%s", encodedFileName);
                // CONTENT_DISPOSITION 헤더를 설정하여 파일 다운로드를 트리거. 파일 리소스를 응답 본문에 포함시킴
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition).body(resource);

            }else{
                return ResponseEntity.notFound().build(); // 파일이 존재하지 않으면 404응답 반환
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // 예외가 발생하면 500응답 반환
        }
    }

    // downloadSample 마일리지 점수 샘플 파일 다운로드
    @GetMapping("/downloadSample")
    public ResponseEntity<Resource> downloadSample(){ // ResponseEntity<Resource> : HTTP 응답으로 리소스를 반환
        try{
            // miledetailUploadPath를 기준으로 mile_route 경로를 결합하여 파일의 절대 경로를 만든다.
            Path filePath = Paths.get(mileScoreUploadPath).resolve("mileage_score_sample.xlsx").normalize(); // normalize()는 불필요한 . 및 .. 경로 요소를 제거

            // 파일 경로를 URL로 변환. 이를 기반으로 UrlResource 객체를 생성.
            Resource resource = new UrlResource(filePath.toUri()); // UrlResource는 파일 시스템의 파일을 나타내는 리소스

            if(resource.exists()){
                // 파일 이름을 UTF-8 인코딩하여 한글, 특수 문자 등 포함 가능
                String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
                System.out.println("서버에 저장된 다운로드 할 파일명: "+encodedFileName);
                // 인코딩된 파일 이름을 사용하여 CONTENT_DISPOSITION 헤더 설정. filename* 속성은 UTF-8로 인코딩된 파일 이름을 지원
                String contentDisposition = String.format("attachment; filename*=UTF-8''%s", encodedFileName);
                // CONTENT_DISPOSITION 헤더를 설정하여 파일 다운로드를 트리거. 파일 리소스를 응답 본문에 포함시킴
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition).body(resource);

            }else{
                return ResponseEntity.notFound().build(); // 파일이 존재하지 않으면 404응답 반환
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // 예외가 발생하면 500응답 반환
        }
    }

    // 마일리지 점수 엑셀파일 삭제 (매개변수: 삭제할 파일 리스트 배열)
    @PostMapping("/deleteExcel")
    public ResponseEntity<?> deleteExcel(@RequestBody List<Map<String, Object>> mileExcels){
        try{
            String mile_no = (String) mileExcels.get(0).get("mile_no");

            // 파일명에서 마일리지 점수 날짜 가져오기
            List<String> mile_excel_date_list = new ArrayList<>();
            for(Map<String, Object> mileExcel : mileExcels){
                mile_excel_date_list.add(((String) mileExcel.get("mile_excel_file")).trim().substring(0,8));
            }
            System.out.println("마일리지 점수 리스트"+mile_excel_date_list);

            // 마일리지 score 점수 history로 옮기기
            mileScoreService.deleteMileScore(mile_excel_date_list, mile_no);
            
            // 마일리지 excel 파일 history로 옮기기
            mileScoreService.deleteMileScoreExcel(mileExcels);
            return ResponseEntity.ok().body("{\"success\":true}");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }

    //totalMileDocument 마일리지 문서 리스트 형식으로 불러오기 (매개변수: mile_no, page, itemsPerPage)
    @GetMapping("/totalMileDocument/{mile_no}")
    public List<DocumentMile> totalMileDocument(
            @PathVariable String mile_no,
            @RequestParam int page,
            @RequestParam int itemsPerPage
    ) {
        int offset = (page - 1) * itemsPerPage;
        // offset은 SQL 쿼리에서 페이징 처리 시 시작 위치를 지정하는데 사용.
        // 예를 들어, 페이지 당 10개 항목 표시 하고 3번째 페이지를 요청하는 경우, offsetdms 20이 되어
        // DB에서 21번째 항목부터 10개의 항목을 가져오게 된다.
        int limit = itemsPerPage;
        List<DocumentMile> documentMileList = mileScoreService.totalDocument(mile_no, limit, offset);
        return documentMileList;
    }

    //uploadDocument 마일리지 문서 업로드
    @PostMapping("/uploadDocument")
    public ResponseEntity<?> addMileage(
            @RequestParam("mile_no") String mile_no,
            @RequestParam(value="file", required = false) MultipartFile file
    ){
        try {
            String document_file = null; // 파일 경로를 저장할 변수를 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = documentUploadPath;

                document_file = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, document_file); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다

                // 파일명이 중복될 경우 서버 내부적으로 파일명 변경
                String newFileName = document_file;
                int count = 1;
                while(Files.exists(path)){
                    int dotIndex = document_file.lastIndexOf(".");
                    String nameWithoutExtension = (dotIndex == -1) ? document_file : document_file.substring(0, dotIndex);
                    String extension = (dotIndex == -1) ? "" : document_file.substring(dotIndex);
                    newFileName = nameWithoutExtension + "_" + count + extension;
                    path = Paths.get(uploadPath, newFileName);
                    count++;
                }

                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장

                // DB에는 원래 파일명을 저장
                int result = mileScoreService.addMileageDocument(mile_no, document_file);
                if (result > 0) {
                    return ResponseEntity.ok().body(Map.of("success", true));
                } else {
                    return ResponseEntity.status(400).body(Map.of("success", false, "message", "문서 추가 실패"));
                }
            } else{
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "파일이 존재하지 않습니다."));
            }
        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "서버 내부 오류"));
        }
    }

    // downloadDocument 마일리지 문서 다운로드 ( 매개변수: document_file)
    @GetMapping("/downloadDocument/{document_file}")
    public ResponseEntity<Resource> downloadDocument(@PathVariable String document_file){ // ResponseEntity<Resource> : HTTP 응답으로 리소스를 반환
        try{
            // miledetailUploadPath를 기준으로 mile_route 경로를 결합하여 파일의 절대 경로를 만든다.
            Path filePath = Paths.get(documentUploadPath).resolve(document_file).normalize(); // normalize()는 불필요한 . 및 .. 경로 요소를 제거

            // 파일 경로를 URL로 변환. 이를 기반으로 UrlResource 객체를 생성.
            Resource resource = new UrlResource(filePath.toUri()); // UrlResource는 파일 시스템의 파일을 나타내는 리소스
            if(resource.exists()){
                // 파일 이름을 UTF-8 인코딩하여 한글, 특수 문자 등 포함 가능
                String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
                // 인코딩된 파일 이름을 사용하여 CONTENT_DISPOSITION 헤더 설정. filename* 속성은 UTF-8로 인코딩된 파일 이름을 지원
                String contentDisposition = String.format("attachment; filename*=UTF-8''%s", encodedFileName);
                // CONTENT_DISPOSITION 헤더를 설정하여 파일 다운로드를 트리거. 파일 리소스를 응답 본문에 포함시킴

                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition).body(resource);

            }else{
                return ResponseEntity.notFound().build(); // 파일이 존재하지 않으면 404응답 반환
            }

        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // 예외가 발생하면 500응답 반환
        }
    }

    // deleteDocument 마일리지 문서 삭제 (매개변수: deleteArray )
    @PostMapping("/deleteDocument")
    public ResponseEntity<?> deleteDocument(@RequestBody List<Map<String, Object>> deleteArray){
        try{
            List<String> mile_document_no_list = new ArrayList<>();
            for(Map<String, Object> mileDocument : deleteArray){
                mile_document_no_list.add(((String) mileDocument.get("document_mile_no")));
            }
            System.out.println("마일리지 문서 번호 리스트"+mile_document_no_list);

            mileScoreService.deleteMileDocument(mile_document_no_list);
            return ResponseEntity.ok().body("{\"success\":true}");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }

    // getDocumentSum 마일리지 총 건수 가져오기 (매개변수: mile_no)
    @GetMapping("/getDocumentSum/{mile_no}")
    public int getDocumentSum(@PathVariable String mile_no){
        try{
            int sum = mileScoreService.getSum(mile_no);
            return sum;
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }


    //페이지별 방문자수 : hit mile가져오기
    @GetMapping("hit_mileChart")
    public ArrayList<HitMile> hit_mileChart(){
        return hitMileService.getHitMile();
    }

    //페이지별 방문자수 날짜별 데이터 가져오기
    @PostMapping("/hit_mileChartDATE")
    public ArrayList<HitMile> hit_mileChartDATE(@RequestBody Map<String, String> requestBody) {
        String date = requestBody.get("date");
        return hitMileService.getHitMileDATE(date);
    }

    //top5 마왕
    @GetMapping("/kingData")
    public ArrayList<MileScore> kingData(){
        return mileScoreService.kingData();
    }

    @GetMapping("/getMileAge/{user_no}")
    public MileByAge getMileAge(@PathVariable String user_no) {
        MileByAge mileByAge = mileScoreService.getMileAge(user_no);
        System.out.println("나이별별 차트 " + mileByAge);
        return mileByAge;
    }

    @GetMapping("/getMilePosition/{user_no}")
    public MileByPosition getMilePosition(@PathVariable String user_no) {
        MileByPosition mileByPosition = mileScoreService.getMilePosition(user_no);
        System.out.println("직급별 차트 " + mileByPosition);
        return mileByPosition;
    }

    @GetMapping("/getMileJob/{user_no}")
    public MileByJob getMileJob(@PathVariable String user_no) {
        MileByJob mileByJob = mileScoreService.getMileJob(user_no);
        System.out.println("직무별 차트 " + mileByJob);
        return mileByJob;
    }

}



