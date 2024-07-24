package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.MileByAge;
import com.kbstar.mileEasy.beans.MileByPosition;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/mileage")
public class KgmController{

    @Autowired
    private BestBranchService bestBranchService;
    @Autowired
    private BestPgService bestPgService;
    @Autowired
    private CSService csService;
    @Autowired
    private HotTipService hotTipService;
    @Autowired
    private HrdService hrdService;
    @Autowired
    private LeagueTableService leagueTableService;
    @Autowired
    private MonthlyBaseService monthlyBaseService;
    @Autowired
    private MonthlyBestService monthlyBestService;
    @Autowired
    private MyMileageService myMileageService;
    @Autowired
    private HitMileService hitMileService;
    @Autowired
    private MileHistoryService mileHistoryService;
    @Autowired
    private MileScoreService mileScoreService;
    @Autowired
    private MileService mileService;

    //여기서 컨트롤러 코딩
    @GetMapping("/getMileAge/{user_no}")
    public MileByAge getMileAge(@PathVariable String user_no) {
        MileByAge mileByAge = mileScoreService.getMileAge(user_no);
        System.out.println("나이별별 차트 " + mileByAge);
        return mileByAge;
    }

    @GetMapping("/getMilePosition/{user_no}")
    public MileByPosition getMilePosition(@PathVariable String user_no) {
        MileByPosition mileByPosition = mileScoreService.getMilePosition(user_no);
        System.out.println("직급별 차트 " + mileByPosition);
        return mileByPosition;
    }

}

