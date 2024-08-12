package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.service.target.TargetService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/target")
public class TargetController {

        @Autowired
        TargetService targetService;

        //개인형 목표 추가하기
        @PostMapping("/create")
        public void createTarget(@RequestBody Target target) {
            System.out.println("target created 메소드 도착 ! " + target);
            targetService.addTarget(target);
            System.out.print("target:"+target);
         }
        //개인형 목표 불러오기
        @GetMapping("/user/{userNo}")
        public List<Target> getTarget(@PathVariable String userNo) {
            System.out.print("target getTarget 메소드 도착 ! ");
            return targetService.getTargetByUserNo(userNo);
        }

        // 참여형 목표 불러오기
        @GetMapping("/admin/targets/{userNo}")
        public List<Target> getAdminTargets(@PathVariable String userNo) {
            System.out.println("Admin targets !");
            return targetService.getAdminTargets(userNo);
        }

}
