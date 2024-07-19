package com.kbstar.mileEasy.mapper;
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

    List<MileRecommand> getRecommand(String userNo);
}
