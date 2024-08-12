package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.PageCount;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.service.manager.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;

@RestController
@RequestMapping("/mana")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    // 파일 업로드 경로
    @Value("${project.uploadpath.miledetail}")
    private String miledetailUploadPath;

    // 마일리지 이름 가져오기
    @GetMapping("/mileIntro/{user_no}")
    public User getMileTitle(@PathVariable String user_no) {
        User user = managerService.getMileTitle(user_no);
        System.out.println(user);
        return user;
    }

    // 마일리지 추천멘트 가져오기
    @GetMapping("/mileRecommand/{mile_no}")
    public List<MileRecommand> getMileRecommand(@PathVariable String mile_no) {
        List<MileRecommand> mileRecommands = managerService.getRecommand(mile_no);
        System.out.println(mileRecommands);
        return mileRecommands;
    }

    // 마일리지 추천멘트 수정하기
    @PostMapping("/updateRecommand")
    public ResponseEntity<?> updateRecommand(@RequestBody MileRecommand mileRecommand) {
        System.out.println("지금 이건 업데이트 할 멘트~~" + mileRecommand);
        int result = managerService.updateMileRecommand(mileRecommand.getMile_mention(), mileRecommand.getMile_recommand_no());
        if (result > 0) {
            return ResponseEntity.ok().body("{\"success\":true}");
        } else {
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }

    // 마일리지 추천멘트 추가하기
    @PostMapping("/addRecommand")
    public ResponseEntity<?> addRecommand(@RequestBody MileRecommand mileRecommand) {
        int result = managerService.addMileRecommand(mileRecommand.getMile_no(), mileRecommand.getMile_mention());
        if (result > 0) {
            return ResponseEntity.ok().body("{\"success\":true}");
        } else {
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }

    // 마일리지 추천멘트 삭제하기
    @GetMapping("/deleteRecommand/{mile_recommand_no}")
    public ResponseEntity<?> deleteRecommand(@PathVariable String mile_recommand_no) {
        int result = managerService.deleteMileRecommand(mile_recommand_no);
        if (result > 0) {
            return ResponseEntity.ok().body("{\"success\":true}");
        } else {
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }
    // addTarget 마일리지 목표 설정 추가하기(param: targetInfo)
    @PostMapping("/addTarget")
    public ResponseEntity<?> addTarget(@RequestBody Target target) {
        System.out.println("이건 등록할 거" + target);
        int result = managerService.addTarget(target.getMile_no(), target.getUser_no(), target.getStart_date(), target.getEnd_date(), target.getTarget_mileage(),true,true);
        if (result > 0) {
            return ResponseEntity.ok().body("{\"success\":true}");
        } else {
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }

    // targetList 마일리지 목표 리스트 가져오기
    @GetMapping("/targetList/{mile_no}")
    public List<Target> getTargets(@PathVariable String mile_no) {
        List<Target> mileageTargets = managerService.getTargets(Integer.parseInt(mile_no));
        return mileageTargets;
    }

    // 마일리지 상세내용 가져오기
    @GetMapping("/mileDetail/{mile_no}")
    public List<MileIntroduce> getMileDetail(@PathVariable String mile_no) {
        List<MileIntroduce> mileIntroduceList = managerService.getMileDetail(mile_no);
        return mileIntroduceList;
    }

    // 마일리지 상세내용 추가하기
    @PostMapping("/mileAdd")
    public ResponseEntity<?> addMileage( // ResponseEntity<?>는 HTTP응답을 의미. 제네릭 타입은 응답 본문이 특정 타입이 아님을 의미
                                         @RequestParam("mile_no") String mile_no,
                                         @RequestParam("mile_title") String mile_title,
                                         @RequestParam("mile_content") String mile_content,
                                         @RequestParam(value = "file", required = false) MultipartFile file,
                                         @RequestParam("job_name") String job_name
    ) {
        try {
            String mile_route = null; // 파일 경로를 저장할 변수를 선언
//            String uploadPath; // 파일 업로드 경로를 저장할 변수를 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = miledetailUploadPath;

                // 파일 저장
                mile_route = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, mile_route); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다

                // 파일명이 중복될 경우 서버 내부적으로 파일명 변경
                String newFileName = mile_route;
                int count = 1;
                while(Files.exists(path)){
                    int dotIndex = mile_route.lastIndexOf(".");
                    String nameWithoutExtension = (dotIndex == -1) ? mile_route : mile_route.substring(0, dotIndex);
                    String extension = (dotIndex == -1) ? "" : mile_route.substring(dotIndex);
                    newFileName = nameWithoutExtension + "_" + count + extension;
                    path = Paths.get(uploadPath, newFileName);
                    count++;
                }

                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장
            }

            int result = managerService.addMileage(mile_no, mile_title, mile_content, mile_route);
            int result2 = managerService.addMileageDetail(mile_no, mile_title, job_name);
            if (result+result2 > 1) {
                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "마일리지 추가 실패"));
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }

    }

    // 마일리지 상세내용 중 파일 다운로드하기
    @GetMapping("/downloadFile/{mile_route}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String mile_route) { // ResponseEntity<Resource> : HTTP 응답으로 리소스를 반환
        try {
            // miledetailUploadPath를 기준으로 mile_route 경로를 결합하여 파일의 절대 경로를 만든다.
            Path filePath = Paths.get(miledetailUploadPath).resolve(mile_route).normalize(); // normalize()는 불필요한 . 및 .. 경로 요소를 제거
            // 파일 경로를 URL로 변환. 이를 기반으로 UrlResource 객체를 생성.
            Resource resource = new UrlResource(filePath.toUri()); // UrlResource는 파일 시스템의 파일을 나타내는 리소스

            if (resource.exists()) {
                // 파일 이름을 UTF-8 인코딩하여 한글, 특수 문자 등 포함 가능
                String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
                // 인코딩된 파일 이름을 사용하여 CONTENT_DISPOSITION 헤더 설정. filename* 속성은 UTF-8로 인코딩된 파일 이름을 지원
                String contentDisposition = String.format("attachment; filename*=UTF-8''%s", encodedFileName);
                // CONTENT_DISPOSITION 헤더를 설정하여 파일 다운로드를 트리거. 파일 리소스를 응답 본문에 포함시킴
                return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition).body(resource);

            } else {
                return ResponseEntity.notFound().build(); // 파일이 존재하지 않으면 404응답 반환
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build(); // 예외가 발생하면 500응답 반환
        }
    }

    // 마일리지 상세보기 삭제하기
    @GetMapping("/deleteMile/{mile_introduce_no}")
    public ResponseEntity<?> deleteMileDetail(@PathVariable String mile_introduce_no) {
        int result2 = managerService.deleteMileDetail(mile_introduce_no);
        int result = managerService.deleteMile(mile_introduce_no);

        if (result+result2 > 1) {
            return ResponseEntity.ok().body("{\"success\":true}");
        } else {
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"fail delete detail\"}");
        }
    }

    // 마일리지 상세보기 수정 시 기존 정보 가져오기
    @GetMapping("/mileModifyDetail/{mile_introduce_no}")
    public MileIntroduce mileModifyDetail(@PathVariable String mile_introduce_no, @RequestParam String mile_no) {
        MileIntroduce mileModify = managerService.mileModifyDetail(mile_introduce_no, mile_no);
        System.out.println(mileModify);
        return mileModify;
    }

    // 마일리지 상세보기 수정 등록하기
    @PostMapping("/updateDetail")
    public ResponseEntity<?> updateMileage( // ResponseEntity<?>는 HTTP응답을 의미. 제네릭 타입은 응답 본문이 특정 타입이 아님을 의미
                                            @RequestParam("mile_introduce_no") String mile_introduce_no,
                                            @RequestParam("mile_title") String mile_title,
                                            @RequestParam("job_name") String job_name,
                                            @RequestParam("mile_content") String mile_content,
                                            @RequestParam(value = "file", required = false) MultipartFile file
    ) {
        Path tempFilePath = null; // 임시 파일 경로를 저장할 변수를 선언
        try {
            String mile_route = null; // 파일 경로를 저장할 변수를 선언

            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = miledetailUploadPath;

                // 임시 파일 생성
                tempFilePath = Files.createTempFile("upload_", ".tmp");
                Files.copy(file.getInputStream(), tempFilePath, StandardCopyOption.REPLACE_EXISTING);

                // 파일 저장
                mile_route = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, mile_route); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다

                // 파일명이 중복될 경우 서버 내부적으로 파일명 변경
                String newFileName = mile_route;
                int count = 1;
                while(Files.exists(path)){
                    int dotIndex = mile_route.lastIndexOf(".");
                    String nameWithoutExtension = (dotIndex == -1) ? mile_route : mile_route.substring(0, dotIndex);
                    String extension = (dotIndex == -1) ? "" : mile_route.substring(dotIndex);
                    newFileName = nameWithoutExtension + "_" + count + extension;
                    path = Paths.get(uploadPath, newFileName);
                    count++;
                }

                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장
            }

            int result = managerService.updateMileage(mile_title, mile_content, mile_route, mile_introduce_no);
            int result2 = managerService.updateMileageDetail(mile_introduce_no, job_name);
            if (result+result2 > 1) {
                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "마일리지 추가 실패"));
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        } finally {
            // 임시 파일 삭제
            if (tempFilePath != null) {
                try {
                    Files.deleteIfExists(tempFilePath);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

    }

    @PostMapping("/mileCount")
    public ArrayList<HitMile> mileCount(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate,
            @RequestParam("mile_no") String mile_no) {

        // 파라미터를 읽어서 서비스 호출
        String start = startDate;
        String end = endDate;
        String mile = mile_no;

        return managerService.mileCount(start, end, mile);
    }


    @PostMapping("/mileageCount")
    public ResponseEntity<Map<String, List<MileScore>>> mileageCount(
            @RequestParam("mile_no") String mile_no) {

        Map<String, List<MileScore>> mileageCounts = managerService.mileageCount(mile_no);
        return ResponseEntity.ok(mileageCounts);
    }


    @PostMapping("/visitCount")
    public ResponseEntity<Map<String, List<PageCount>>> visitCount(
            @RequestParam("mile_no") String mile_no) {

        Map<String, List<PageCount>> visitCounts = managerService.visitCount(mile_no);
        return ResponseEntity.ok(visitCounts);
    }

}

