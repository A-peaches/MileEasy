package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.service.notice.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    private final String uploadPath = "C:\\MileEasy\\SpringBoot\\src\\main\\webapp\\notice";

    // 게시글 작성
    @PostMapping("/write")
    public ResponseEntity<Notice> createNotice(@RequestBody Notice notice) {
        Notice createdNotice = noticeService.createNotice(notice);
        return ResponseEntity.ok(createdNotice);
    }

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
        noticeService.incrementViews(noticeId);
        return ResponseEntity.ok().build();
    }

    //게시글 상세보기
    @GetMapping("/{noticeId}")
    public ResponseEntity<Notice> getNoticeDetails(@PathVariable("noticeId") int noticeId) {
        Notice notice = noticeService.getNoticeDetails(noticeId);
        return ResponseEntity.ok(notice);
    }

    //파일 다운로드
    @GetMapping("/notice/downloadFile/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadPath).resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
                String contentDisposition = "attachment; filename*=UTF-8''" + encodedFileName;

                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}


