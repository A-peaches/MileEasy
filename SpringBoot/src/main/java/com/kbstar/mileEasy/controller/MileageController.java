package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.mapper.UserDao;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
        System.out.println(mileScoreList);
        return mileScoreList;
    }

    //페이지별 방문자수 처리
    @GetMapping("hit_mile/{mile_no}")
    public void hit_mile(@PathVariable String mile_no) {
        hitMileService.hitMile(mile_no);
    }


    //페이지별 방문자수 : hit mile가져오기
    @GetMapping("hit_mileChart")
    public ArrayList<HitMile> hit_mileChart(){
        return hitMileService.getHitMile();
    }

    //페이지별 방문자수 날짜별 데이터 가져오기
    @PostMapping("/hit_mileChartDATE")
    public ArrayList<HitMile> hit_mileChartDATE(@RequestBody Map<String, String> requestBody) {
        String date = requestBody.get("date");
        return hitMileService.getHitMileDATE(date);
    }

    //top5 마왕
    @GetMapping("/kingData")
    public ArrayList<MileScore> kingData(){
        return mileScoreService.kingData();
    }






//    //마일리지 추천멘트!
//    @GetMapping("getRecommand/{user_no}")
//    public List<MileRecommand> getRecommand(@PathVariable String user_no) {
//        List<MileRecommand> recommandsList = mileService.getRecommand(user_no);
//
//    }


}
