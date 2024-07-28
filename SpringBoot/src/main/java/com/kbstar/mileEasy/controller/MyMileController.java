package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.MileByJob;
import com.kbstar.mileEasy.beans.MyMiles;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/myMile")
public class MyMileController {


        @Autowired
        private MyMileageService myMileageService;

        @GetMapping("/getMyMiles/{user_no}")
        public List<MyMiles> getMyMiles(@PathVariable String user_no) {
            List<MyMiles> myMiles = myMileageService.getMyMiles(user_no);
            System.out.println("직무별 차트 " + myMiles);
            return myMiles;
    }



}