package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.Favorite;
import com.kbstar.mileEasy.dto.Mileage;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface FavoriteDao {

    ArrayList<Favorite> getFavorite(String userNo);
}
