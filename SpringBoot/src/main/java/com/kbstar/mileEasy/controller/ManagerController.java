package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.service.manager.ManagerService;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    @Autowired
    private ManagerService managerService;
}
