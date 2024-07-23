package com.kbstar.mileEasy.service.notice;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.mapper.NoticeDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeDao noticeDao;

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

    public Notice createNotice(Notice notice) {
        noticeDao.insertNotice(notice);
        return notice;
    }



}
