package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.MileIntroduce;
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.manager.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;

    @GetMapping("/mileIntro/{user_no}")
    public User getMileTitle(@PathVariable String user_no) {
        User user = managerService.getMileTitle(user_no);
        System.out.println(user);
        return user;
    }

    @GetMapping("/mileDetail/{mile_no}")
    public List<MileIntroduce> getMileDetail(@PathVariable String mile_no){
        List<MileIntroduce> mileIntroduceList = managerService.getMileDetail(mile_no);
        System.out.println(mileIntroduceList.get(0));
        return mileIntroduceList;
    }

    @PostMapping("/mileAdd")
    public ResponseEntity<?> resetPassword(@RequestBody MileIntroduce mileIntroduce){
        System.out.println("이건 서버로 넘어왔다~"+mileIntroduce);
        int result = managerService.addMileage(mileIntroduce.getMile_no(), mileIntroduce.getMile_title(), mileIntroduce.getMile_content());
        if(result>0){
            return ResponseEntity.ok().body("{\"success\":true}");
        }else{
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"add mileage fail\"}");
        }
    }
}
