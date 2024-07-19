package com.kbstar.mileEasy.service.manager;

import com.kbstar.mileEasy.dto.MileIntroduce;
import com.kbstar.mileEasy.dto.User;
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

    public List<MileIntroduce> getMileDetail(String mile_no) {
        return managerDao.selectMileDetail(mile_no);
    }

    public int addMileage(String mile_no, String mile_title, String mile_content, String mile_route) {
        return managerDao.insertMile(Integer.parseInt(mile_no), mile_title, mile_content, mile_route);
    }

    public int deleteMile(String mile_introduce_no) {
        return managerDao.deleteMile(mile_introduce_no);
    }

    public MileIntroduce mileModifyDetail(String mile_introduce_no) {
        return managerDao.selectModifyMile(mile_introduce_no);
    }

    public int updateMileage(String mile_title, String mile_content, String mile_route, String mile_introduce_no) {
        return managerDao.updateMile(mile_title, mile_content, mile_route, Integer.parseInt(mile_introduce_no));
    }
}