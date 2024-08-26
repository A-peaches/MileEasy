package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.GroupWeight;
import com.kbstar.mileEasy.service.group.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/group")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @GetMapping("/getUsersRank")
    public ResponseEntity<?> getUserMileages(@RequestParam("date") String date, @RequestParam("group_no") int group_no) {
        try {
            List<Map<String, Object>> result = groupService.getUserMileages(date, group_no);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace(); // 스택 트레이스 출력
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/getWeight")
    public List<GroupWeight> getWeight(@RequestParam("group_no") int group_no) {
        return groupService.getWeight(group_no);
    }

}
