package com.kbstar.mileEasy.service.user.favorite;

import com.kbstar.mileEasy.mapper.AttendanceDao;
import com.kbstar.mileEasy.mapper.FavoriteDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteDao favoriteDao;


}
