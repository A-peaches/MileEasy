package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("getFavorite/{user_no}")
    public ArrayList<Favorite> user_no(@PathVariable String user_no) {
        ArrayList<Favorite> favoriteList = favoriteService.getFavorite(user_no);
        System.out.println(favoriteList);
        return favoriteList;
    }
}
