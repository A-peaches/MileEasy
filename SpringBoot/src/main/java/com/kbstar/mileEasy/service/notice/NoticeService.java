package com.kbstar.mileEasy.service.notice;

import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.mapper.MtipDao;
import com.kbstar.mileEasy.mapper.NoticeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoticeService {

    @Autowired
    private NoticeDao noticeDao;

    public Notice createNotice(Notice notice) {
        noticeDao.insertNotice(notice);
        return notice;
    }

    public List<Notice> getAllNotices() {
        return noticeDao.getAllNotices();
    }

    public Notice getNoticeById(int id) {
        return noticeDao.getNoticeById(id);
    }


}
