package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.service.target.TargetService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/target")
public class TargetController {

        @Autowired
        TargetService targetService;

        @PostMapping("/create")
        public void createTarget(@RequestBody Target target) {
            targetService.addTarget(target);
         }
}
