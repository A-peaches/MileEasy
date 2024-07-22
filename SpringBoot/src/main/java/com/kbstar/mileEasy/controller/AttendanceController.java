package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.Attendances;
import com.kbstar.mileEasy.dto.MileRecommand;
import com.kbstar.mileEasy.service.user.attendance.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("getAttendance/{user_no}")
    public List<Attendances> getAttendance(@PathVariable String user_no) {
        List<Attendances> attendances = attendanceService.getRecommand(user_no);
        System.out.println(attendances);
        return attendances;
    }
}
