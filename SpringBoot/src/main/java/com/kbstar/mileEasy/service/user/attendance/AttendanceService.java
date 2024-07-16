package com.kbstar.mileEasy.service.user.attendance;

import com.kbstar.mileEasy.mapper.AttendanceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDao attendancerDao;


}
