package com.kbstar.mileEasy.service.user.attendance;

import com.kbstar.mileEasy.beans.Attendances;
import com.kbstar.mileEasy.mapper.AttendanceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDao attendancerDao;


    public List<Attendances> getRecommand(String userNo) {
        return attendancerDao.getRecommand(userNo);
    }
}
