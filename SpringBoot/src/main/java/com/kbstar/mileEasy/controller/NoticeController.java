package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.MtipGuide;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.service.notice.MtipGuideService;
import com.kbstar.mileEasy.service.notice.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;


@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @Autowired
    private MtipGuideService mtipGuideService;



    /*추가코드*/
    @Value("${project.uploadpath.notice}")
    private String uploadPath;

    @Value("${project.uploadpath.mTipGuide}")
    private String mTipGuideUploadPath;

    @GetMapping("/{id}")
    public ResponseEntity<Notice> getNotice(@PathVariable Long id) {

        Notice notice = noticeService.findById(id);
        if (notice != null) {
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<?> writeNotice(@RequestParam("title") String title,
                                         @RequestParam(value = "mile_no", required = false) String mileNoStr,
                                         @RequestParam("content") String content,
                                         @RequestParam("user_no") String userNo,
                                         @RequestParam("user_name") String userName,
                                         @RequestParam(value = "file", required = false) String fileInfo) {
        try {
            Notice notice = new Notice();
            notice.setNotice_board_title(title);

            Integer mileNo = null;
            if (mileNoStr != null && !mileNoStr.isEmpty() && !mileNoStr.equalsIgnoreCase("null") && !mileNoStr.equals("기타")) {
                mileNo = Integer.valueOf(mileNoStr);
            }
            notice.setMile_no(mileNo);

            notice.setNotice_board_content(content);
            notice.setUser_no(userNo);  // String 타입으로 설정
            notice.setUser_name(userName);

            if (fileInfo != null && !fileInfo.isEmpty()) {
                String[] fileNames = fileInfo.split(","); // 파일명과 원본 파일명을 분리
                if (fileNames.length < 2) {
                    throw new IllegalArgumentException("Invalid fileInfo format: " + fileInfo);
                }
                String savedFileName = fileNames[0]; // 서버에 저장된 파일명 (UUID 포함)
                String originalFileName = fileNames[1]; // 원본 파일명

                notice.setNotice_board_file(originalFileName); // 원본 파일명을 DB에 저장
            }

            noticeService.createNotice(notice);

            return ResponseEntity.ok().body("공지사항이 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("공지사항 등록 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    //글쓰기에서 new 파일 등록하기
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("files") MultipartFile file) {
        try {
            String originalFileName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String savedFileName = uuid + "_" + originalFileName;

            Path filePath = Paths.get(uploadPath).resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 여기서는 파일명만 반환하고, 데이터베이스 저장은 별도의 서비스 로직에서 처리
            return ResponseEntity.ok().body(savedFileName + "," + originalFileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
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
    @GetMapping("/details/{noticeId}")
    public ResponseEntity<Notice> getNoticeDetails(@PathVariable int noticeId) {

        Notice notice = noticeService.getNoticeDetails(noticeId);
        if (notice != null) {

            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //파일 다운로드
    @GetMapping("/download/{originalFileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String originalFileName) throws IOException {
        // 파일명 디코딩
        originalFileName = URLDecoder.decode(originalFileName, StandardCharsets.UTF_8.toString());

        // 서버에 저장된 파일 이름을 찾기
        String savedFileName = findSavedFileName(originalFileName);

        if (savedFileName == null) {
            return ResponseEntity.notFound().build();
        }

        // 파일 경로 설정 (실제 경로로 수정 필요)
        Path filePath = Paths.get(uploadPath).resolve(savedFileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists()) {
            // 파일 이름을 UTF-8 인코딩하여 한글, 특수 문자 등 포함 가능
            String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
            // 인코딩된 파일 이름을 사용하여 CONTENT_DISPOSITION 헤더 설정. filename* 속성은 UTF-8로 인코딩된 파일 이름을 지원
            String contentDisposition = String.format("attachment; filename*=UTF-8''%s", encodedFileName);
            // CONTENT_DISPOSITION 헤더를 설정하여 파일 다운로드를 트리거. 파일 리소스를 응답 본문에 포함시킴
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // 파일이 존재하지 않으면 404응답 반환
        }
    }

    // 서버에 저장된 파일 이름을 찾는 메서드 (예시)
    private String findSavedFileName(String originalFileName) throws IOException {
        try (Stream<Path> paths = Files.walk(Paths.get(uploadPath))) {
            return paths
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .filter(name -> name.endsWith("_" + originalFileName))
                    .findFirst()
                    .orElse(null);
        }
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateNotice(
            @RequestParam("notice_board_no") int noticeBoardNo,
            @RequestParam("notice_board_title") String title,
            @RequestParam("mile_name") String mileName,
            @RequestParam("notice_board_content") String content,
            @RequestParam("user_no") String userNo,
            @RequestParam("user_name") String userName,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "originalFileName", required = false) String originalFileName) {
        try {

            Notice notice = new Notice();
            notice.setNotice_board_no(noticeBoardNo);
            notice.setNotice_board_title(title);
            notice.setMile_name(mileName);
            notice.setNotice_board_content(content);
            notice.setUser_no(userNo);
            notice.setUser_name(userName);

            if (file != null && !file.isEmpty()) {
                String savedFileName = UUID.randomUUID().toString() + "_" + originalFileName;
                Path filePath = Paths.get(uploadPath).resolve(savedFileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                notice.setNotice_board_file(originalFileName); // DB에는 원본 파일명만 저장
            } else if (originalFileName != null && !originalFileName.isEmpty()) {
                notice.setNotice_board_file(originalFileName);
            }

            noticeService.updateNotice(notice);
            return ResponseEntity.ok("Notice updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating notice: " + e.getMessage());
        }
    }

    // DELETE 요청을 처리하는 엔드포인트
    @DeleteMapping("/delete/{noticeId}")
    public ResponseEntity<String> deleteNotice(@PathVariable Long noticeId) {
        try {
            noticeService.deleteNotice(noticeId);
            return ResponseEntity.ok("Notice deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting notice: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notice: " + e.getMessage());
        }
    }

    @GetMapping("/getFooterNotice")
    public List<Notice> getFooterNotice() {
        List<Notice> notices =  noticeService.getFooterNotice();

        return notices;
    }

    //MTIP가이드 첨부파일
    @PostMapping("/mTipGuideUpload")
    public ResponseEntity<String> mTipGuideUpload(@RequestParam("files") MultipartFile file) {
        try {
            String originalFileName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String savedFileName = uuid + "_" + originalFileName;

            Path filePath = Paths.get(mTipGuideUploadPath).resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 여기서는 파일명만 반환하고, 데이터베이스 저장은 별도의 서비스 로직에서 처리
            return ResponseEntity.ok().body(savedFileName + "," + originalFileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/mTipGuideWrite")
    public ResponseEntity<?> mTipGuideWrite(@RequestParam("title") String title,
                                         @RequestParam("content") String content,
                                         @RequestParam("user_no") String userNo,
                                         @RequestParam("user_name") String userName,
                                         @RequestParam(value = "file", required = false) String fileInfo) {
        try {
            MtipGuide mtipGuide = new MtipGuide();
            mtipGuide.setMtip_guide_title(title);


            mtipGuide.setMtip_guide_content(content);
            mtipGuide.setUser_no(userNo);  // String 타입으로 설정
            mtipGuide.setUser_name(userName);

            if (fileInfo != null && !fileInfo.isEmpty()) {
                String[] fileNames = fileInfo.split(","); // 파일명과 원본 파일명을 분리
                if (fileNames.length < 2) {
                    throw new IllegalArgumentException("Invalid fileInfo format: " + fileInfo);
                }
                String savedFileName = fileNames[0]; // 서버에 저장된 파일명 (UUID 포함)
                String originalFileName = fileNames[1]; // 원본 파일명

                mtipGuide.setMtip_guide_file(originalFileName); // 원본 파일명을 DB에 저장
            }

            mtipGuideService.createMtipGudie(mtipGuide);

            return ResponseEntity.ok().body("M-Tip 가이드가 성공적으로 등록되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("M-Tip 가이드 등록 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @PostMapping("/mTipGuideList")
    public ArrayList<MtipGuide> mTipGuideList() {

     return mtipGuideService.mTipGuideList();
    }

    @GetMapping("/GudieDetail/{mtipGuideNo}")
    public ResponseEntity<MtipGuide> getGuide(@PathVariable long mtipGuideNo) {
        MtipGuide mtipGuide = mtipGuideService.findById(mtipGuideNo);
        if (mtipGuide != null) {
            return ResponseEntity.ok(mtipGuide);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/GuideIncrement-views/{mtipGuideNo}")
    public ResponseEntity<MtipGuide> incrementGuideNoticeViews(@PathVariable("mtipGuideNo") int mtipGuideNo) {
        try {
            mtipGuideService.incrementViews(mtipGuideNo);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @DeleteMapping("/Guidedelete/{mtip_guide_no}")
    public ResponseEntity<String> deleteGuide(@PathVariable Long mtip_guide_no) {
        try {
            mtipGuideService.deleteNotice(mtip_guide_no);
            return ResponseEntity.ok("가이드 deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting notice: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notice: " + e.getMessage());
        }
    }

    @GetMapping("/downloadGuide/{originalFileName:.+}")
    public ResponseEntity<Resource> GuidedownloadFile(@PathVariable String originalFileName) throws IOException {
        // 파일명 디코딩
        originalFileName = URLDecoder.decode(originalFileName, StandardCharsets.UTF_8.toString());

        // 서버에 저장된 파일 이름을 찾기
        String savedFileName = findSavedFileGuideName(originalFileName);

        if (savedFileName == null) {
            return ResponseEntity.notFound().build();
        }

        // 파일 경로 설정 (실제 경로로 수정 필요)
        Path filePath = Paths.get( mTipGuideUploadPath).resolve(savedFileName).normalize();
        Resource resource = new UrlResource(filePath.toUri());

        if (resource.exists()) {
            // 파일 이름을 UTF-8 인코딩하여 한글, 특수 문자 등 포함 가능
            String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());
            // 인코딩된 파일 이름을 사용하여 CONTENT_DISPOSITION 헤더 설정. filename* 속성은 UTF-8로 인코딩된 파일 이름을 지원
            String contentDisposition = String.format("attachment; filename*=UTF-8''%s", encodedFileName);
            // CONTENT_DISPOSITION 헤더를 설정하여 파일 다운로드를 트리거. 파일 리소스를 응답 본문에 포함시킴
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
                    .body(resource);
        } else {
            return ResponseEntity.notFound().build(); // 파일이 존재하지 않으면 404응답 반환
        }
    }

    // 서버에 저장된 파일 이름을 찾는 메서드 (예시)
    private String findSavedFileGuideName(String originalFileName) throws IOException {
        try (Stream<Path> paths = Files.walk(Paths.get(mTipGuideUploadPath))) {
            return paths
                    .filter(Files::isRegularFile)
                    .map(Path::getFileName)
                    .map(Path::toString)
                    .filter(name -> name.endsWith("_" + originalFileName))
                    .findFirst()
                    .orElse(null);
        }
    }

    @PostMapping("/GuideUpdate")
    public ResponseEntity<?> GuideUpdate(
            @RequestParam("mtip_guide_no") int mtip_guide_no,
            @RequestParam("mtip_guide_title") String mtip_guide_title,
            @RequestParam("mtip_guide_content") String mtip_guide_content,
            @RequestParam("user_no") String user_no,
            @RequestParam("user_name") String user_name,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "originalFileName", required = false) String originalFileName) {

        try {

            MtipGuide mtipGuide = new MtipGuide();
            mtipGuide.setMtip_guide_no(mtip_guide_no);
            mtipGuide.setMtip_guide_title(mtip_guide_title);
            mtipGuide.setMtip_guide_content(mtip_guide_content);
            mtipGuide.setUser_no(user_no);
            mtipGuide.setUser_name(user_name);

            if (file != null && !file.isEmpty()) {
                String savedFileName = UUID.randomUUID().toString() + "_" + originalFileName;
                Path filePath = Paths.get(mTipGuideUploadPath).resolve(savedFileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                mtipGuide.setMtip_guide_file(originalFileName); // DB에는 원본 파일명만 저장
            } else if (originalFileName != null && !originalFileName.isEmpty()) {
                mtipGuide.setMtip_guide_file(originalFileName);
            }

            mtipGuideService.updateGuide(mtipGuide);


            return ResponseEntity.ok("Notice updated successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating notice: " + e.getMessage());
        }
    }

    @GetMapping("/Guide/{mtipGuideNo}")
    public ResponseEntity<MtipGuide> getGuide(@PathVariable Long mtipGuideNo) {

        MtipGuide mtipGuide = mtipGuideService.findById(mtipGuideNo);
        if (mtipGuide != null) {
            return ResponseEntity.ok(mtipGuide);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}



