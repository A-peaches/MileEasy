package com.kbstar.mileEasy.controller;



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
public class KshController{

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

    //top5 마왕
    @GetMapping("/jumpData")
    public ArrayList<MileScore> jumpData(){
        return mileScoreService.jumpData();
    }
    @GetMapping("/kingDataSelect")
    public ArrayList<MileScore> kingDataSelect(){
        return mileScoreService.kingDataSelect();
    }

    @GetMapping("/jumpDataSelect")
    public ArrayList<MileScore> jumpDataSelect(){
        return mileScoreService.jumpDataSelect();
    }




}