package com.kbstar.mileEasy.service.user.favorite;

import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.mapper.AttendanceDao;
import com.kbstar.mileEasy.mapper.FavoriteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteDao favoriteDao;


    public ArrayList<Favorite> getFavorite(String userNo) {
        return favoriteDao.getFavorite(userNo);
    }
}
