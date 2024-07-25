package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.MileByAge;
import com.kbstar.mileEasy.beans.MileByJob;
import com.kbstar.mileEasy.beans.MileByPosition;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.mapper.UserDao;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장

                // 엑셀 파일 데이터 추출
                FileInputStream fis = new FileInputStream(path.toFile());
                Workbook workbook = new XSSFWorkbook(fis);
                Sheet sheet = workbook.getSheetAt(0); // 첫번째 시트만 처리

                // mile_score_date 추출(A1 셀 값)
                String mile_score_date = sheet.getRow(0).getCell(0).getStringCellValue();

                // 제목행 추출(두번째 행)
                Row titleRow = sheet.getRow(1);
                List<String> mile_score_name = new ArrayList<>();


            }
            int result1 = mileScoreService.addMileExcel(mile_no, mile_excel_file);
            //int result2 = mileScoreService.addMileScore() // 마일리지 점수 추가
            if (result1 > 0) {
                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "마일리지 추가 실패"));
            }
        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }
    }

    // mileExcelFiles 마일리지 점수 엑셀파일 리스트 가져오기 (매개변수: 선택된 날짜)
    @GetMapping("/mileExcelFiles")
    public List<MileExcel> mileExcelFiles(@RequestParam("date") String date){
        String selectedDate = date.split("T")[0]; // yyyy-MM-dd 형식으로 변환
        List<MileExcel> mileExcelList = mileScoreService.getMileExcel(selectedDate);
        return mileExcelList;
    }

    // totalMileExcel 마일리지 점수 엑셀파일 리스트 가져오기 ( 매개변수: mile_no)
    @GetMapping("/totalMileExcel/{mile_no}")
    public List<MileExcel> totalMileExcel(@PathVariable String mile_no){
        List<MileExcel> mileExcelList = mileScoreService.totalExcel(mile_no);
        return mileExcelList;
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



