package com.kbstar.mileEasy.service.manager;

import com.kbstar.mileEasy.mapper.AttendanceDao;
import com.kbstar.mileEasy.mapper.ManagerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerService {

    @Autowired
    private ManagerDao managerDao;


}
