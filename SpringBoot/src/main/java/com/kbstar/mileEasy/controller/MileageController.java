package com.kbstar.mileEasy.controller;

<<<<<<< HEAD
=======
import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.dto.Mileage;
>>>>>>> 3db48a63b15d1ec5dc0e83aa27bf298bef936e51
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.mileage.info.HitMileService;
import com.kbstar.mileEasy.service.mileage.info.MileHistoryService;
import com.kbstar.mileEasy.service.mileage.info.MileScoreService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.mileage.type.*;
<<<<<<< HEAD
import com.kbstar.mileEasy.service.user.info.GetUserInfoService;
=======
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
>>>>>>> 3db48a63b15d1ec5dc0e83aa27bf298bef936e51
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

    //페이지별 방문자수 처리
    @GetMapping("hit_mile/{mile_no}")
    public void hit_mile(@PathVariable String mile_no) {
        hitMileService.hitMile(mile_no);
    }
}
