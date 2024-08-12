package com.kbstar.mileEasy.service.mtip;

import com.kbstar.mileEasy.dto.MtipGuide;
import com.kbstar.mileEasy.dto.Notice;
import com.kbstar.mileEasy.mapper.MileageDao;
import com.kbstar.mileEasy.mapper.MtipDao;
import com.kbstar.mileEasy.mapper.MtipGuideDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MtipService {

    @Autowired
    private MtipDao mtipDao;


    @Autowired
    private MtipGuideDao mtipGuideDao;

    //m-tip 가이드 조회
    public List<MtipGuide> getAllNotices() throws Exception {
        try {
            List<MtipGuide> notices = mtipGuideDao.selectAllNotices();
            System.out.println("Fetched notices: " + notices);  // 로그 추가
            return notices;
        } catch (Exception e) {
            System.err.println("Error in getAllNotices: " + e.getMessage());  // 로그 추가
            e.printStackTrace();
            throw new Exception("Error fetching notices from database", e);
        }
    }

}
