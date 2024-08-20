package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.service.mtip.MtipBoardService;
import com.kbstar.mileEasy.service.mtip.MtipLikeService;
import com.kbstar.mileEasy.service.mtip.MtipReplyService;
import com.kbstar.mileEasy.service.mtip.MtipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Stream;

@RestController
@RequestMapping("/mtip")
public class MtipController {

    @Value("${project.uploadpath.mTipGuide}")
    private String mTipGuideUploadPath;

    @Autowired
    private MtipService mtipService;
    @Autowired
    private MtipBoardService mtipBoardService;
    @Autowired
    private MtipLikeService mtipLikeService;
    @Autowired
    private MtipReplyService mtipReplyService;

    //m-tip 가이드
    @GetMapping("/list")
    public ResponseEntity<?> getNotices() {
        try {
            System.out.print("m-tip 게시글 리스트 도달 ");
            List<MtipGuide> notices = mtipService.getAllNotices();
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            System.err.println("Error retrieving notices: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }

    @GetMapping("/downloadGuide/{originalFileName:.+}")
    public ResponseEntity<Resource> GuidedownloadFile(@PathVariable String originalFileName) throws IOException {
        System.out.println("도착");
        // 파일명 디코딩
        originalFileName = URLDecoder.decode(originalFileName, StandardCharsets.UTF_8.toString());

        // 서버에 저장된 파일 이름을 찾기
        String savedFileName = findSavedFileGuideName(originalFileName);

        if (savedFileName == null) {
            return ResponseEntity.notFound().build();
        }

        // 파일 경로 설정 (실제 경로로 수정 필요)
        Path filePath = Paths.get(mTipGuideUploadPath).resolve(savedFileName).normalize();
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

    //m-tip 게시글 리스트
    @GetMapping("/Mtiplist")
    public ResponseEntity<?> getMtiplist() {
        try {
            System.out.print("m-tip 도달 ");
            List<MtipBoard> notices = mtipBoardService.getMtiplist();
            // 프론트엔드로 보내는 내용을 콘솔에 출력
            System.out.println("프론트엔드로 보내는 데이터:");
            for (MtipBoard notice : notices) {
                System.out.println(notice.toString());
            }
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            System.err.println("Error retrieving notices: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }

    //m-tip 게시글 9개 new 리스트
    @GetMapping("/MtipNewlist")
    public ResponseEntity<?> getMtipNewlist() {
        try {
            System.out.print("m-tip 도달 ");
            List<MtipBoard> notices = mtipBoardService.getMtipNewlist();
            // 프론트엔드로 보내는 내용을 콘솔에 출력
            System.out.println("프론트엔드로 보내는 데이터:");
            for (MtipBoard notice : notices) {
                System.out.println(notice.toString());
            }
            return ResponseEntity.ok(notices);
        } catch (Exception e) {
            System.err.println("Error retrieving notices: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }

    // m-tip 게시글 상세보기
    @GetMapping("/details/{noticeId}")
    public ResponseEntity<?> getMtipDetails(@PathVariable int noticeId) {
        try {
            MtipBoard notice = mtipBoardService.getMtipDetails(noticeId);
            if (notice != null) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(notice);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("{\"error\": \"Notice with ID " + noticeId + " not found.\"}");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\": \"Error fetching notice details: " + e.getMessage() + "\"}");
        }
    }

    // m-tip 조회수 불러오기
    @GetMapping("/MtipViews/{noticeId}")
    public ResponseEntity<String> incrementNoticeViews(@PathVariable("noticeId") int noticeId) {
        try {
            int updatedRows = mtipBoardService.MtipViews(noticeId);
            if (updatedRows > 0) {
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("{\"message\": \"조회수가 증가되었습니다.\"}");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("{\"error\": \"해당 게시글을 찾을 수 없습니다.\"}");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\": \"조회수 증가 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    // 마일리지 카테고리
    @GetMapping("/Mtipmileage")
    public ResponseEntity<List<Mileage>> getTipMileageList() {
        List<Mileage> mileages = mtipBoardService.getTipMileageList();
        return ResponseEntity.ok(mileages);
    }


    // 게시글 등록
    @PostMapping("/write")
    public ResponseEntity<?> MtipWrite(@RequestParam("title") String title,
                                       @RequestParam(value = "mile_no", required = false) String mileNoStr,
                                       @RequestParam("content") String content,
                                       @RequestParam("user_no") String userNo,
                                       @RequestParam("user_name") String userName,
                                       @RequestParam(value = "file", required = false) String fileInfo) {
        try {
            MtipBoard notice = new MtipBoard();
            notice.setMtip_board_title(title);

            Integer mileNo = null;
            if (mileNoStr != null && !mileNoStr.isEmpty() && !mileNoStr.equalsIgnoreCase("null") && !mileNoStr.equals("기타")) {
                mileNo = Integer.valueOf(mileNoStr);
            }
            notice.setMile_no(mileNo);

            notice.setMtip_board_content(content);
            notice.setUser_no(userNo);  // String 타입으로 설정
            notice.setUser_name(userName);

            if (fileInfo != null && !fileInfo.isEmpty()) {
                String[] fileNames = fileInfo.split(","); // 파일명과 원본 파일명을 분리
                if (fileNames.length < 2) {
                    throw new IllegalArgumentException("Invalid fileInfo format: " + fileInfo);
                }
                String savedFileName = fileNames[0]; // 서버에 저장된 파일명 (UUID 포함)
                String originalFileName = fileNames[1]; // 원본 파일명

                notice.setMtip_board_file(originalFileName); // 원본 파일명을 DB에 저장
            }

            mtipBoardService.createMtip(notice);

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

            Path filePath = Paths.get(mTipGuideUploadPath).resolve(savedFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // 여기서는 파일명만 반환하고, 데이터베이스 저장은 별도의 서비스 로직에서 처리
            return ResponseEntity.ok().body(savedFileName + "," + originalFileName);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //m-tip id로 정보 불러오기
    @GetMapping("/{id}")
    public ResponseEntity<MtipBoard> getNotice(@PathVariable Long id) {
        MtipBoard notice = mtipBoardService.findById(id);
        if (notice != null) {
            return ResponseEntity.ok(notice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    //로그인 정보 좋아요 목록
    @GetMapping("/liked-posts/{userNo}")
    public ResponseEntity<List<Long>> getLikedPosts(@PathVariable String userNo) {
        List<Long> likedPosts = mtipBoardService.getLikedPostsByUser(userNo);
        return ResponseEntity.ok(likedPosts);
    }

    //좋아요 수 증가
    @PostMapping("/like")
    public ResponseEntity<?> likePost(@RequestBody Map<String, Object> payload) {
        int mtipBoardNo = Integer.parseInt(payload.get("mtip_board_no").toString());
        String userNo = payload.get("user_no").toString();

        int isLiked = mtipBoardService.likePost(mtipBoardNo, userNo);
        return ResponseEntity.ok(Map.of("isLiked", isLiked));
    }

    //좋아요 수 감소
    @PostMapping("/unlike")
    public ResponseEntity<?> unlikePost(@RequestBody Map<String, Object> payload) {
        int mtipBoardNo = Integer.parseInt(payload.get("mtip_board_no").toString());
        String userNo = payload.get("user_no").toString();

        int isLiked = mtipBoardService.unlikePost(mtipBoardNo, userNo);
        return ResponseEntity.ok(Map.of("isLiked", isLiked));
    }

    //좋아요 확인
    @GetMapping("/check-like")
    public ResponseEntity<?> checkLike(@RequestParam("mtip_board_no") int mtipBoardNo, @RequestParam("user_no") String userNo) {
        boolean isLiked = mtipBoardService.checkLike(mtipBoardNo, userNo);
        return ResponseEntity.ok(Map.of("isLiked", isLiked));
    }


    //m-tip 수정
    @PostMapping("/update")
    public ResponseEntity<?> updateNotice(
            @RequestParam("mtip_board_no") int noticeBoardNo,
            @RequestParam("mtip_board_title") String title,
            @RequestParam("mile_name") String mileName,
            @RequestParam("mtip_board_content") String content,
            @RequestParam("user_no") String userNo,
            @RequestParam("user_name") String userName,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestParam(value = "originalFileName", required = false) String originalFileName) {
        try {

            MtipBoard notice = new MtipBoard();
            notice.setMtip_board_no(noticeBoardNo);
            notice.setMtip_board_title(title);
            notice.setMile_name(mileName);
            notice.setMtip_board_content(content);
            notice.setUser_no(userNo);
            notice.setUser_name(userName);

            if (file != null && !file.isEmpty()) {
                String savedFileName = UUID.randomUUID().toString() + "_" + originalFileName;
                Path filePath = Paths.get(mTipGuideUploadPath).resolve(savedFileName);
                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                notice.setMtip_board_file(originalFileName); // DB에는 원본 파일명만 저장
            } else if (originalFileName != null && !originalFileName.isEmpty()) {
                notice.setMtip_board_file(originalFileName);
            }

            mtipBoardService.updateNotice(notice);
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
            mtipBoardService.deleteNotice(noticeId);
            return ResponseEntity.ok("Notice deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error deleting notice: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting notice: " + e.getMessage());
        }
    }

    //나만의 m-tip 게시글 리스트
    @GetMapping("/Mymtiplist")
    public ResponseEntity<?> getMtiplist(@RequestParam String user_no) {
        try {
            List<MtipBoard> notices = mtipBoardService.getMymtiplist(user_no);
            return ResponseEntity.ok(notices);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }

    //내가 좋아요한 m-tip 게시글 리스트
    @GetMapping("/MyBestmtiplist")
    public ResponseEntity<?> getMyBestmtiplist(@RequestParam String user_no) {
        try {
            List<MtipBoard> notices = mtipBoardService.getMyBestmtiplist(user_no);
            return ResponseEntity.ok(notices);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }

    // 좋아요가 많은 게시글 9개 가져오기
    @GetMapping("/bestMtiplist")
    public ResponseEntity<?> getBestMtiplist() {
        try {
            System.out.print("m-tip 도달 ");
            List<MtipBoard> bestNotices = mtipBoardService.getTopLikedMtiplist();
            // 프론트엔드로 보내는 내용을 콘솔에 출력
            System.out.println("프론트엔드로 보내는 데이터:");
            for (MtipBoard notice : bestNotices) {
                System.out.println(notice.toString());
            }
            return ResponseEntity.ok(bestNotices);
        } catch (Exception e) {
            System.err.println("Error retrieving best notices: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error retrieving best notices: " + e.getMessage());
        }
    }

    // 좋아요가 많은 게시글 10개 가져오기
    @GetMapping("/PlusbestMtiplist")
    public ResponseEntity<List<MtipBoard>> getPlusbestMtiplist() {
        try {
            System.out.print("m-tip 도달 ");
            List<MtipBoard> bestNotices = mtipBoardService.getTopLikedMtiplistPlus();
            // 프론트엔드로 보내는 내용을 콘솔에 출력
            System.out.println("프론트엔드로 보내는 데이터:");
            for (MtipBoard notice : bestNotices) {
                System.out.println(notice.toString());
            }
            return ResponseEntity.ok(bestNotices);
        } catch (Exception e) {
            System.err.println("Error retrieving best notices: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // 댓글 저장
    @PostMapping("/comments")
    public ResponseEntity<?> addComment(@RequestBody MtipReply mtipReply) {
        try {
            mtipReplyService.addComment(mtipReply);
            return ResponseEntity.ok("댓글이 성공적으로 추가되었습니다.");
        } catch (Exception e) {
            System.err.println("Error adding comment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("댓글 추가 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // 댓글 불러오기
    @GetMapping("/comments/{mtipBoardNo}")
    public ResponseEntity<?> getComments(@PathVariable int mtipBoardNo) {
        try {
            List<MtipReply> comments = mtipReplyService.getComments(mtipBoardNo);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            System.err.println("Error retrieving comments: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("댓글 불러오기 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // 댓글 수정
    @PostMapping("/updateComment/{mtipReplyNo}")
    public ResponseEntity<?> updateComment(@PathVariable int mtipReplyNo, @RequestBody MtipReply mtipReply) {
        try {
            mtipReply.setMtip_reply_no(mtipReplyNo);
            mtipReplyService.updateComment(mtipReply);
            return ResponseEntity.ok("댓글이 성공적으로 수정되었습니다.");
        } catch (Exception e) {
            System.err.println("Error updating comment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("댓글 수정 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    // 댓글 삭제
    @DeleteMapping("/deleteComment/{mtipReplyNo}")
    public ResponseEntity<?> deleteComment(@PathVariable int mtipReplyNo) {
        try {
            mtipReplyService.deleteComment(mtipReplyNo);
            return ResponseEntity.ok("댓글이 성공적으로 삭제되었습니다.");
        } catch (Exception e) {
            System.err.println("Error deleting comment: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("댓글 삭제 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    @PostMapping("/complain/{noticeId}")
    public void complain(@PathVariable Long noticeId) {
        mtipBoardService.complain(noticeId);
    }


    @PostMapping("/complainBack/{noticeId}")
    public void complainBack(@PathVariable Long noticeId) {
        mtipBoardService.complainBack(noticeId);
    }


    @GetMapping("/MtiplistComplain")
    public ResponseEntity<?> MtiplistComplain() {
        try {
            List<MtipBoard> notices = mtipBoardService.MtiplistComplain();
            return ResponseEntity.ok(notices);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error retrieving notices: " + e.getMessage());
        }
    }
}
