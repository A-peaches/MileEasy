package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.service.group.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Map<String, Object>> getUserMileages(@RequestParam("date") String date) {
        System.out.println(groupService.getUserMileages(date));
        return groupService.getUserMileages(date);
    }
}
