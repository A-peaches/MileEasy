package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @GetMapping("getFavorite/{user_no}")
    public ArrayList<Favorite> user_no(@PathVariable String user_no) {
        ArrayList<Favorite> favoriteList = favoriteService.getFavorite(user_no);
        return favoriteList;
    }

    // POST 요청을 처리하는 메서드
    @PostMapping("/changeFavorite/{user_no}")
    public List<Favorite> changeFavorite(@RequestBody List<String> favorites, @PathVariable String user_no) {
        favoriteService.changeFavorite(user_no, favorites);
        List<Favorite> favoriteList = favoriteService.getFavorite(user_no);
        return favoriteList;
    }

}
