package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.service.notice.NoticeService;
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
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    private final String uploadPath = "C:\\MileEasy\\SpringBoot\\src\\main\\webapp\\notice";

    //게시글 리스트
    @GetMapping("/list")
    public ResponseEntity<?> getNotices() {
        try {
            List<Notice> notices = noticeService.getAllNotices();
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            System.err.println("Error retrieving notices: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }

    // 마일리지 카테고리
    @GetMapping("/mileage")
    public ResponseEntity<List<Mileage>> getMileageList(){
        List<Mileage> mileages = noticeService.getAllMilesge();
        return ResponseEntity.ok(mileages);
    }
    // 게시글 조회수
    @PostMapping("/increment-views/{noticeId}")
    public ResponseEntity<Void> incrementNoticeViews(@PathVariable("noticeId") int noticeId) {
        try {
            noticeService.incrementViews(noticeId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    //게시글 상세보기
    @GetMapping("/{noticeId}")
    public ResponseEntity<Notice> getNoticeDetails(@PathVariable("noticeId") int noticeId) {
        Notice notice = noticeService.getNoticeDetails(noticeId);
        return ResponseEntity.ok(notice);
    }


    @Value("${project.uploadpath.notice}")
    private String noticeUploadPath;

    @PostMapping("/badgeUpload")
    public ResponseEntity<?> uploadBadge(@RequestParam(value="file", required = false) MultipartFile file) {
        try {
            String notice_file = null; // 파일 경로를 저장할 변수를 선언
            if (file != null && !file.isEmpty()) { // 파일이 존재하고 비어있지 않을 때만 파일을 저장
                String uploadPath = noticeUploadPath; // 실제 경로로 변경 필요
                notice_file = StringUtils.cleanPath(file.getOriginalFilename()); // 파일 이름을 클린업하여 불필요한 경로 요소가 제거
                Path path = Paths.get(uploadPath, notice_file ); // 업로드 경로와 파일 이름을 결합하여 파일의 절대 경로를 만든다
                Files.createDirectories(path.getParent()); // 파일이 저장될 경로의 상위 디렉토리를 생성. 디렉토리가 이미 존재하면 무시한다.
                try (var inputStream = file.getInputStream()) {
                    Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING); // 파일의 입력 스트림을 읽어 지정된 경로에 파일을 저장, 기존 파일 덮어쓰기
                    System.out.println("파일 경로: " + path.toAbsolutePath()); //경로확인
                }
                return ResponseEntity.ok().body(Map.of("success", true, "fileName", notice_file)); // 파일 이름 반환
            } else {
                return ResponseEntity.status(400).body(Map.of("success", false, "message", "파일이 제공되지 않았거나 비어있습니다"));
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("success", false, "message", "파일 업로드 실패"));
        }
    }


    private String getFileExtension(String fileName) {
        int dotIndex = fileName.lastIndexOf(".");
        return (dotIndex == -1) ? "" : fileName.substring(dotIndex);
    }

    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<?> writeNotice(@RequestParam("title") String title,
                                         @RequestParam("mile_no") int mileNo,
                                         @RequestParam("content") String content,
                                         @RequestParam("user_no") String userNo,
                                         @RequestParam("user_name") String userName,
                                         @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Notice notice = new Notice();
            notice.setNotice_board_title(title);
            notice.setMile_no(mileNo);
            notice.setNotice_board_content(content);
            notice.setUser_no(userNo);
            notice.setUser_name(userName);
            notice.setNotice_board_file(file != null ? file.getOriginalFilename() : null); // 파일명만 설정

            noticeService.createNotice(notice);

            return ResponseEntity.ok().body("공지사항이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("공지사항 등록 중 오류가 발생했습니다.");
        }
    }


}


