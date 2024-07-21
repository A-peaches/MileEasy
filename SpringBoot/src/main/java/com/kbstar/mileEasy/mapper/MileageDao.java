package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.HitMile;
import com.kbstar.mileEasy.dto.MileRecommand;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.dto.Mileage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;
import java.util.List;


@Mapper
public interface MileageDao {


    int getHitMileCount(@Param("mile_no") String mileNo);

    void insertHitMile(@Param("mile_no") String mileNo);

    void updateMile(@Param("mile_no") String mileNo);


    ArrayList<Mileage> getMileage();
    ArrayList<MileScore> getMileScore(String userNo);


    ArrayList<HitMile> getHitMile();

    ArrayList<HitMile> getHitMileDATE(String date);
<<<<<<< HEAD

    List<MileRecommand> getRecommand(String userNo);

=======
>>>>>>> a28362d8d91364df0f6ce55a7027fc021a5d9e2e
}
