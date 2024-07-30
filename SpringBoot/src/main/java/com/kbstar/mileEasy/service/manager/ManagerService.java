package com.kbstar.mileEasy.service.manager;

import com.kbstar.mileEasy.beans.PageCount;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.mapper.ManagerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ManagerService {

    @Autowired
    private ManagerDao managerDao;

    public User getMileTitle(String user_no) {
        return managerDao.selectMileTitle(user_no);
    }

    public List<MileRecommand> getRecommand(String mile_no){
        return managerDao.selectMileRecommand(mile_no);
    }

    public List<MileIntroduce> getMileDetail(String mile_no) {
        return managerDao.selectMileDetail(mile_no);
    }

    public int addMileage(String mile_no, String mile_title, String mile_content, String mile_route) {
        return managerDao.insertMile(Integer.parseInt(mile_no), mile_title, mile_content, mile_route);
    }
    public int addMileageDetail(String mile_no, String mile_title, String job_name){
        return managerDao.insertMileDetail(mile_no, mile_title, job_name);
    }
    public int deleteMile(String mile_introduce_no) {
        return managerDao.deleteMile(mile_introduce_no);
    }
    public int deleteMileDetail(String mile_introduce_no) { return managerDao.deleteMileDetail(mile_introduce_no);}
    public MileIntroduce mileModifyDetail(String mile_introduce_no, String mile_no) {
        return managerDao.selectModifyMile(mile_introduce_no, mile_no);
    }

    public int updateMileage(String mile_title, String mile_content, String mile_route, String mile_introduce_no) {
        return managerDao.updateMile(mile_title, mile_content, mile_route, Integer.parseInt(mile_introduce_no));
    }

    public int updateMileageDetail(String mile_introduce_no, String job_name){
        return managerDao.updateMileDetail(mile_introduce_no, job_name);
    }

    public int updateMileRecommand(String mile_mention, String mile_recommand_no){
        return managerDao.updateRecommand(mile_mention, Integer.parseInt(mile_recommand_no));
    }

    public int addMileRecommand(String mile_no, String mile_mention){
        return managerDao.insertRecommand(mile_no, mile_mention);
    }

    public int deleteMileRecommand(String mile_recommand_no){
        return managerDao.deleteRecommand(mile_recommand_no);
    }





    public ArrayList<PageCount> visitCount(String startDate, String mile_no) {return managerDao.visitCount(startDate, mile_no);
    }

    public ArrayList<MileScore> mileageCount(String startDate, String mile_no) {return managerDao.mileageCount(startDate, mile_no);
    }

    public ArrayList<HitMile> mileCount(String start, String end, String mile) {return managerDao.mileCount(start,
            end,
            mile);
    }
}