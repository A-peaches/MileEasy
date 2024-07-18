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

    public User getMileTitle(String user_no) { return managerDao.selectMileTitle(user_no);}
    public List<MileIntroduce> getMileDetail(String mile_no) { return managerDao.selectMileDetail(mile_no);}

}
