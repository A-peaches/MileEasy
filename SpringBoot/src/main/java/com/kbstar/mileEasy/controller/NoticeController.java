package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.service.notice.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    /*추가코드*/
    @Value("${project.uploadpath.notice}")
    private String uploadPath;

    // 게시글 수정
    @PostMapping("/update")
    public ResponseEntity<?> updateNotice(
            @RequestParam("notice_board_no") int noticeBoardNo,
            @RequestParam("notice_board_title") String title,
            @RequestParam("mile_name") String mileName,
            @RequestParam("notice_board_content") String content,
            @RequestParam("user_no") String userNo,
            @RequestParam("user_name") String userName,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            Notice notice = new Notice();
            notice.setNotice_board_no(noticeBoardNo);
            notice.setNotice_board_title(title);
            notice.setMile_name(mileName);
            notice.setNotice_board_content(content);
            notice.setUser_no(userNo);
            notice.setUser_name(userName);

            if (file != null && !file.isEmpty()) {
                String originalFileName = file.getOriginalFilename();
                String decodedFileName = URLDecoder.decode(originalFileName, StandardCharsets.UTF_8.toString());
                String fileName = UUID.randomUUID().toString() + "_" + decodedFileName;
                Path filePath = Paths.get(uploadPath).resolve(fileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                notice.setNotice_board_file(decodedFileName); // DB에는 UUID를 제외한 파일명만 저장
            }

            noticeService.updateNotice(notice);
            return ResponseEntity.ok("Notice updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating notice: " + e.getMessage());
        }
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<Notice> getNotice(@PathVariable Long id) {
//        Notice notice = noticeService.findById(id);
//        if (notice != null) {
//            return ResponseEntity.ok(notice);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        try {
            noticeService.deleteNotice(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notice");
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(uploadPath).resolve(fileName);
            Files.copy(file.getInputStream(), filePath);
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("파일 업로드 실패");
        }
    }

    @GetMapping("/download/{encodedFileName}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String encodedFileName) {
        try {
            String decodedFileName = URLDecoder.decode(encodedFileName, StandardCharsets.UTF_8.name());
            System.out.println("Decoded file name: " + decodedFileName); // 로그 추가

            // UUID를 포함한 파일 이름 찾기
            Path dirPath = Paths.get(uploadPath);
            String matchingFileName = null;

            try (DirectoryStream<Path> stream = Files.newDirectoryStream(dirPath)) {
                for (Path path : stream) {
                    if (path.getFileName().toString().endsWith("_" + decodedFileName)) {
                        matchingFileName = path.getFileName().toString();
                        break;
                    }
                }
            }

            if (matchingFileName == null) {
                System.out.println("File not found");
                return ResponseEntity.notFound().build();
            }

            Path filePath = dirPath.resolve(matchingFileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_OCTET_STREAM)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + URLEncoder.encode(decodedFileName, StandardCharsets.UTF_8.toString()) + "\"")
                        .body(resource);
            } else {
                System.out.println("Resource not readable");
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
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
    public ResponseEntity<Notice> getNoticeDetails(@PathVariable int noticeId) {
        Notice notice = noticeService.getNoticeDetails(noticeId);
        if (notice != null) {
            System.out.println("Notice details: " + notice); // 로그 추가
            System.out.println("File name: " + notice.getNotice_board_file()); // 파일 이름 로그 추가
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<?> writeNotice(@RequestParam("title") String title,
                                         @RequestParam("mile_no") int mileNo,
                                         @RequestParam("content") String content,
                                         @RequestParam("user_no") String userNo,
                                         @RequestParam("user_name") String userName,
                                         @RequestParam(value = "file", required = false) String fileName) {
        try {
            Notice notice = new Notice();
            notice.setNotice_board_title(title);
            notice.setMile_no(mileNo);
            notice.setNotice_board_content(content);
            notice.setUser_no(userNo);
            notice.setUser_name(userName);

            if (fileName != null && !fileName.isEmpty()) {
                // 파일 이름에서 UUID 부분을 제거하고 실제 파일 이름만 저장합니다.
                String[] parts = fileName.split("_", 2);  // "_" 문자로 문자열을 분리합니다.
                String actualFileName = parts.length > 1 ? parts[1] : fileName;  // 실제 파일 이름을 가져옵니다.
                notice.setNotice_board_file(actualFileName);
            }

            noticeService.createNotice(notice);

            return ResponseEntity.ok().body("공지사항이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("공지사항 등록 중 오류가 발생했습니다.");
        }
    }

}


