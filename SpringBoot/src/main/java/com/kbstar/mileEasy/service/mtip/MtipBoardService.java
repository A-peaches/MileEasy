package com.kbstar.mileEasy.service.mtip;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.MtipBoard;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.mapper.MtipDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MtipBoardService {

    @Autowired
    private MtipDao mtipDao;

    //m-tip 게시글 조회
    public List<MtipBoard> getMtiplist() throws Exception {
        try {
            List<MtipBoard> notices = mtipDao.selectMtiplist();
            System.out.println("Fetched notices: " + notices);  // 로그 추가
            return notices;
        } catch (Exception e) {
            System.err.println("Error in getAllNotices: " + e.getMessage());  // 로그 추가
            e.printStackTrace();
            throw new Exception("Error fetching notices from database", e);
        }
    }

    //m-tip 상세보기
    public MtipBoard getMtipDetails(int noticeId) {
        return mtipDao.getMtipDetails(noticeId);
    }

    //게시글 조회 수
    @Transactional
    public int MtipViews(int noticeId) {
        System.out.println("Mtip notice ID: " + noticeId);
        return mtipDao.MtipViews(noticeId);
    }

    //카테고리 조회
    public List<Mileage> getTipMileageList(){
        return mtipDao.selectMtipMileage();
    }

    // 공지사항 작성
    public void createMtip(MtipBoard notice) {
        if (notice.getUser_no() == null || notice.getUser_no().isEmpty()) {
            throw new IllegalArgumentException("Invalid user_no: " + notice.getUser_no());
        }

        // 파일 이름이 null이 아닌 경우에만 설정
        if (notice.getMtip_board_file() != null && !notice.getMtip_board_file().isEmpty()) {
            notice.setMtip_board_file(notice.getMtip_board_file());
        } else {
            notice.setMtip_board_file(null);
        }

        mtipDao.insertMtip(notice);
    }

//    // 공지사항 작성
//    public void createMtip(MtipBoard notice) {
//        if (notice.getUser_no() == null || notice.getUser_no().isEmpty()) {
//            throw new IllegalArgumentException("Invalid user_no: " + notice.getUser_no());
//        }
//
//        // User 검증이 필요한 경우 (옵션)
//        // User user = userDao.selectUserById(notice.getUser_no());
//        // if (user == null) {
//        //     throw new IllegalArgumentException("User not found for user_no: " + notice.getUser_no());
//        // }
//
//        // 파일 이름이 null이 아닌 경우에만 설정
//        if (notice.getMtip_board_file() != null && !notice.getMtip_board_file().isEmpty()) {
//            notice.setMtip_board_file(notice.getMtip_board_file());
//        } else {
//            notice.setMtip_board_file(null);
//        }
//
//        mtipDao.insertMtip(notice);
//    }

    // ID로 공지사항 찾기
    public MtipBoard findById(Long id) {
        System.out.println("findById: " + id);
        return mtipDao.findById(id);
    }

    //좋아요
    public boolean checkLikeStatus(int mtipBoardNo, String userNo) {
        return mtipDao.checkLikeStatus(mtipBoardNo, userNo) > 0;
    }
    //좋아요
    @Transactional
    public boolean toggleLike(int mtipBoardNo, String userNo) {
        boolean isLiked = checkLikeStatus(mtipBoardNo, userNo);

        if (isLiked) {
            mtipDao.deleteLike(mtipBoardNo, userNo);
            mtipDao.decrementLikeCount(mtipBoardNo);
            return false;
        } else {
            mtipDao.insertLike(mtipBoardNo, userNo);
            mtipDao.incrementLikeCount(mtipBoardNo);
            return true;
        }
    }

    public List<Integer> getLikedPostIds(String userId) {
        return mtipDao.getLikedPostIds(userId);
    }

    //mtip 수정하기
    @Transactional
    public void updateNotice(MtipBoard notice) {
        mtipDao.updateNotice(notice);
    }

    //mtip 삭제
    public void deleteNotice(Long id) {
        MtipBoard notice =  mtipDao.findById(id);
        if (notice != null) {
            mtipDao.deleteNotice(id);
        } else {
            throw new RuntimeException("Notice not found");
        }
    }
    // 나만의 m-tip 게시글 조회
    public List<MtipBoard> getMymtiplist(String user_no) throws Exception {
        try {
            if (user_no == null || user_no.isEmpty()) {
                throw new IllegalArgumentException("User number is required");
            }
            List<MtipBoard> notices = mtipDao.selectMymtiplist(user_no);
            System.out.println("Fetched notices for user " + user_no + ": " + notices);  // 로그 추가
            return notices;
        } catch (Exception e) {
            System.err.println("Error in getMymtiplist for user " + user_no + ": " + e.getMessage());  // 로그 추가
            e.printStackTrace();
            throw new Exception("Error fetching notices from database for user " + user_no, e);
        }
    }

}
