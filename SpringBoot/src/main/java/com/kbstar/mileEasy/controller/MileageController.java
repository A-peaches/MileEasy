package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.User;
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

import java.util.ArrayList;

@RestController
@RequestMapping("/mileage")
public class MileageController {

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

    //마일리지 테이블 가지고오기
    @GetMapping("/getMileage")
    public ArrayList<Mileage> getMileage() {
        ArrayList<Mileage> mileList = mileService.getMileage();
        System.out.println(mileList);
        return mileList;
    }

    @GetMapping("/getMileScore/{user_no}")
    public ArrayList<MileScore> getMileScore(@PathVariable String user_no) {
        ArrayList<MileScore> mileScoreList = mileScoreService.getMileScore(user_no);
        return mileScoreList;
    }
}
