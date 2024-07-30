package com.kbstar.mileEasy.service.notice;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.mapper.NoticeDao;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class NoticeService {

    private final AtomicInteger counter = new AtomicInteger(1); // 초기값을 설정합니다.

    @Autowired
    private NoticeDao noticeDao;

    @Autowired
    private UserDao userDao;

    //글 리스트 조회
    public List<Notice> getAllNotices() throws Exception {
        try {
            return noticeDao.selectAllNotices();
        } catch (Exception e) { // 예외처리
            throw new Exception("Error fetching notices from database", e);
        }
    }

    //카테고리 조회
    public List<Mileage> getAllMilesge(){
        return noticeDao.selectAllMileage();
    }

    //게시글 조회 수
    public void incrementViews(int noticeId) {
        System.out.println("Service: Incrementing views for notice ID: " + noticeId); // 로그 추가
        noticeDao.incrementViews(noticeId);
    }

    //게시글 상세보기
    public Notice getNoticeDetails(int noticeId) {
        return noticeDao.getNoticeDetails(noticeId);
    }

    // 공지사항 작성
    public void createNotice(Notice notice) {
        User user = userDao.selectUserById(notice.getUser_no());
        if (user == null) {
            throw new IllegalArgumentException("Invalid user_no: " + notice.getUser_no());
        }

        // 파일 이름이 null이 아닌 경우에만 설정
        if (notice.getNotice_board_file() != null && !notice.getNotice_board_file().isEmpty()) {
            notice.setNotice_board_file(notice.getNotice_board_file());
        } else {
            notice.setNotice_board_file(null);
        }

        noticeDao.insertNotice(notice);
    }

    @Transactional
    public void updateNotice(Notice notice) {
        int mileNo = noticeDao.findMileNoByName(notice.getMile_name());
        notice.setMile_no(mileNo);

        // 파일명에서 UUID 제거
        if (notice.getNotice_board_file() != null && !notice.getNotice_board_file().isEmpty()) {
            String[] parts = notice.getNotice_board_file().split("_", 2);
            String actualFileName = parts.length > 1 ? parts[1] : notice.getNotice_board_file();
            notice.setNotice_board_file(actualFileName);
        }

        noticeDao.updateNotice(notice);
    }

    public Notice findById(Long id) {
        return noticeDao.findById(id);
    }

    public void deleteNotice(Long id) {
        Notice notice = noticeDao.findById(id);
        if (notice != null) {
            notice.setNotice_board_is_delete(true); // 논리 삭제
            noticeDao.deleteNotice(notice);
        } else {
            throw new RuntimeException("Notice not found");
        }
    }

    public List<Notice> getFooterNotice() {
        return noticeDao.getFooterNotice();
    }
}
