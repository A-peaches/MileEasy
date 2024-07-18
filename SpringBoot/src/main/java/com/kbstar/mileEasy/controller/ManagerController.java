package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.manager.ManagerService;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import com.kbstar.mileEasy.service.user.info.GetUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
