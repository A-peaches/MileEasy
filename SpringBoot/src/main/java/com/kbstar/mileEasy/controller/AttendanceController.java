package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.Attendances;
import com.kbstar.mileEasy.dto.MileRecommand;
import com.kbstar.mileEasy.service.user.attendance.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("getAttendance/{user_no}")
    public List<Attendances> getAttendance(@PathVariable String user_no) {
        List<Attendances> attendances = attendanceService.getAttendance(user_no);
        System.out.println("출석 체크 몽땅" + attendances);
        return attendances;
    }

    @GetMapping("addAttendance/{user_no}")
    public void addAttendance(@PathVariable String user_no) {
        attendanceService.addAttendance(user_no);
        System.out.println("출석 체크 성공!");
    }
}