package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.MileIntroduce;
import com.kbstar.mileEasy.dto.User;
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
import java.util.*;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @Value("${project.uploadpath.miledetail}")
    private String miledetailUploadPath;

    @GetMapping("/mileIntro/{user_no}")
    public User getMileTitle(@PathVariable String user_no) {
        User user = managerService.getMileTitle(user_no);
        System.out.println(user);
        return user;
    }

    @GetMapping("/mileDetail/{mile_no}")
    public List<MileIntroduce> getMileDetail(@PathVariable String mile_no){
        List<MileIntroduce> mileIntroduceList = managerService.getMileDetail(mile_no);
        System.out.println(mileIntroduceList.get(0));
        return mileIntroduceList;
    }

    @PostMapping("/mileAdd")
    public ResponseEntity<?> addMileage( // ResponseEntity<?>는 HTTP응답을 의미. 제네릭 타입은 응답 본문이 특정 타입이 아님을 의미
            @RequestParam("mile_no") String mile_no,
            @RequestParam("mile_title") String mile_title,
            @RequestParam("mile_content") String mile_content,
            @RequestParam(value="file", required = false) MultipartFile file
    ){
        try {
            String mile_route = null; // 파일 경로를 저장할 변수를 선언
//            String uploadPath; // 파일 업로드 경로를 저장할 변수를 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = miledetailUploadPath;

                // 파일 저장
                mile_route = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, mile_route); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다
                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장
            } 

            int result = managerService.addMileage(mile_no, mile_title, mile_content, mile_route);
            if (result > 0) {
                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "마일리지 추가 실패"));
            }
        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }

    }

    @GetMapping("/downloadFile/{mile_route}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String mile_route){ // ResponseEntity<Resource> : HTTP 응답으로 리소스를 반환
        try{
            // miledetailUploadPath를 기준으로 mile_route 경로를 결합하여 파일의 절대 경로를 만든다.
            Path filePath = Paths.get(miledetailUploadPath).resolve(mile_route).normalize(); // normalize()는 불필요한 . 및 .. 경로 요소를 제거
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

    @GetMapping("/deleteMile/{mile_introduce_no}")
    public ResponseEntity<?> deleteMileDetail(@PathVariable String mile_introduce_no){
        int result = managerService.deleteMile(mile_introduce_no);
        if(result>0){
            return ResponseEntity.ok().body("{\"success\":true}");
        }else{
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }

    @GetMapping("/mileModifyDetail/{mile_introduce_no}")
    public MileIntroduce mileModifyDetail(@PathVariable String mile_introduce_no){
        MileIntroduce mileModify = managerService.mileModifyDetail(mile_introduce_no);
        System.out.println(mileModify);
        return mileModify;
    }

    @PostMapping("/updateDetail")
    public ResponseEntity<?> updateMileage( // ResponseEntity<?>는 HTTP응답을 의미. 제네릭 타입은 응답 본문이 특정 타입이 아님을 의미
                                            @RequestParam("mile_introduce_no") String mile_introduce_no,
                                            @RequestParam("mile_title") String mile_title,
                                            @RequestParam("mile_content") String mile_content,
                                            @RequestParam(value="file", required = false) MultipartFile file
    ){
        try {
            String mile_route = null; // 파일 경로를 저장할 변수를 선언
//            String uploadPath; // 파일 업로드 경로를 저장할 변수를 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = miledetailUploadPath;

                // 파일 저장
                mile_route = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, mile_route); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다
                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                Files.copy(file.getInputStream(), path); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장
            }

            int result = managerService.updateMileage(mile_title, mile_content, mile_route, mile_introduce_no);
            if (result > 0) {
                return ResponseEntity.ok().body(Map.of("success", true));
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "마일리지 추가 실패"));
            }
        }catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }

    }
}
