package com.kbstar.mileEasy.service.notice;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.mapper.MtipGuideDao;
import com.kbstar.mileEasy.mapper.NoticeDao;
import com.kbstar.mileEasy.mapper.UserDao;
import org.apache.ibatis.annotations.Select;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kbstar.mileEasy.dto.MtipGuide;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MtipGuideService {

    private final AtomicInteger counter = new AtomicInteger(1); // 초기값을 설정합니다.

    @Autowired
    private NoticeDao noticeDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private MtipGuideDao mtipGuideDao;



    // 공지사항 작성
    public void createMtipGudie(MtipGuide mtipGuide) {
        if (mtipGuide.getUser_no() == null || mtipGuide.getUser_no().isEmpty()) {
            throw new IllegalArgumentException("Invalid user_no: " + mtipGuide.getUser_no());
        }


        // 파일 이름이 null이 아닌 경우에만 설정
        if (mtipGuide.getMtip_guide_file() != null && !mtipGuide.getMtip_guide_file().isEmpty()) {
            mtipGuide.setMtip_guide_file(mtipGuide.getMtip_guide_file());
        } else {
            mtipGuide.setMtip_guide_file(null);
        }

        mtipGuideDao.insertMtipGuide(mtipGuide);
    }

    // ID로 공지사항 찾기
    public MtipGuide findById(Long mtipGuideNo) {
        return mtipGuideDao.findById(mtipGuideNo);
    }

    public void incrementViews(int mtipGuideNo) {
        System.out.println("Service: Incrementing views for notice ID: " + mtipGuideNo); // 로그 추가
        mtipGuideDao.incrementViews(mtipGuideNo);
    }


    public void deleteNotice(Long mtip_guide_no) {
        MtipGuide mtipGuide = mtipGuideDao.findById(mtip_guide_no);
        if (mtipGuide != null) {
            mtipGuideDao.deleteNotice(mtip_guide_no);
        } else {
            throw new RuntimeException("Notice not found");
        }
    }






    @Transactional
    public void updateNotice(Notice notice) {
        noticeDao.updateNotice(notice);
    }



    public List<Notice> getFooterNotice() {
        return noticeDao.getFooterNotice();
    }



    public ArrayList<MtipGuide> mTipGuideList() {
        return mtipGuideDao.mTipGuideList();
    }


    public void updateGuide(MtipGuide mtipGuide) {
        mtipGuideDao.updateGuide(mtipGuide);
    }


}
