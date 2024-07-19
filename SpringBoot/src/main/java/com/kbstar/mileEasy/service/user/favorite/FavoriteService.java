package com.kbstar.mileEasy.service.user.favorite;

import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.mapper.AttendanceDao;
import com.kbstar.mileEasy.mapper.FavoriteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteDao favoriteDao;


    public ArrayList<Favorite> getFavorite(String userNo) {
        return favoriteDao.getFavorite(userNo);
    }

    public List<Favorite> changeFavorite(String userNo, List<String> favorites) {
        favoriteDao.deleteFavorite(userNo);
        for (String favorite : favorites) {
        favoriteDao.insertFavorite(userNo, favorite);
        }

        return favoriteDao.getFavorite(userNo);
    }
}
