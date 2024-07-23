package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
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
    @GetMapping("/mileExcelFiles/{selectedDate}")
    public List<MileExcel> mileExcelFiles(@PathVariable Timestamp selectedDate){
        List<MileExcel> mileExcelList = mileScoreService.getMileExcel(selectedDate);
        return mileExcelList;
    }

    // downloadExcelFile 마일리지 점수 엑셀파일 다운로드 (매개변수: 엑셀 파일 명)

}
