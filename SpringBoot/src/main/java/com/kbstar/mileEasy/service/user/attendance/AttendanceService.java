package com.kbstar.mileEasy.service.user.attendance;

import com.kbstar.mileEasy.beans.Attendances;

import com.kbstar.mileEasy.mapper.AttendanceDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceDao attendancerDao;


    public List<Attendances> getAttendance(String userNo) {
        return attendancerDao.getAttendance(userNo);
    }

    public void addAttendance(String userNo) {
        //오늘 날짜 불러오기
        LocalDate today = LocalDate.now();
        System.out.println("오늘날짜 LocalDate : " + today);

        //오늘 날짜 String으로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String strToday = today.format(formatter);

        attendancerDao.addAttendance(userNo, strToday);

    }
}
