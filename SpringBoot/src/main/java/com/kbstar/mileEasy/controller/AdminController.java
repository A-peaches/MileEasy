package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.nio.file.StandardCopyOption;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.http.ResponseEntity;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/admin")
public class AdminController {

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

    @Value("${project.uploadpath.badge}")
    private String badgeUploadPath;

    @PostMapping("/badgeUpload")
    public ResponseEntity<?> uploadBadge(@RequestParam("name") String name,
                                         @RequestParam(value="file", required = false) MultipartFile file) {



        try {
            String badgeFileName = null; // 파일 이름을 저장할 변수 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String originalFileName = StringUtils.cleanPath(file.getOriginalFilename()); // 클린업된 파일 이름 가져오기
                badgeFileName = StringUtils.isEmpty(name) ? originalFileName : name; // 이름이 비어있으면 원본 파일 이름 사용

                Path uploadPath = Paths.get(badgeUploadPath); // 업로드 경로로 Path 객체 생성
                Path filePath = uploadPath.resolve(badgeFileName); // 업로드 경로와 파일 이름 결합하여 파일의 절대 경로 생성

                Files.createDirectories(filePath.getParent()); // 파일이 저장될 경로의 상위 디렉토리 생성

                try (var inputStream = file.getInputStream()) {
                    Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING); // 파일 저장
                    System.out.println("저장된 파일 경로: " + filePath.toAbsolutePath());
                }

                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "파일이 제공되지 않았거나 비어있습니다"));
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }
    }


    @GetMapping("/badgeKingImage")
    public ResponseEntity<?> getBadgeKingImage() {

        String imagePath = "king.jpg";
        String fullPath = badgeUploadPath + File.separator + imagePath;


        try {
            Resource resource = new FileSystemResource(fullPath);
            if (resource.exists()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {

                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(500).body("이미지를 로드할 수 없습니다.");
        }
    }


    @GetMapping("/badgeJumpImage")
    public ResponseEntity<?> getBadgeJumpImage() {

        String imagePath = "jump.jpg";
        String fullPath = badgeUploadPath + File.separator + imagePath;


        try {
            Resource resource = new FileSystemResource(fullPath);
            if (resource.exists()) {

                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(resource);
            } else {

                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {

            e.printStackTrace();
            return ResponseEntity.status(500).body("이미지를 로드할 수 없습니다.");
        }
    }

    @PostMapping("/deleteMile")
    public void deleteMile(@RequestParam("mile_no") String mile_no) {
        System.out.println("삭제할 mile_no: " + mile_no);
        mileService.deleteMile(mile_no);
    }





}
