package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.beans.MileByAge;
import com.kbstar.mileEasy.beans.MileByJob;
import com.kbstar.mileEasy.beans.MileByPosition;
import com.kbstar.mileEasy.dto.MileExcel;
import com.kbstar.mileEasy.dto.HitMile;
import com.kbstar.mileEasy.dto.MileRecommand;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.dto.Mileage;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
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


    List<MileRecommand> getRecommand(String userNo);


    int insertMileExcel(String mile_no, String mile_excel_file);
    List<MileExcel> selectMileExcel(String selectedDate);
    List<MileExcel> selectTotalExcel(String mile_no);


    ArrayList<MileScore> kingData();


    ArrayList<MileScore> jumpData();

    ArrayList<MileScore> kingDataSelect();

    ArrayList<MileScore> jumpDataSelect();

    MileByAge mileByAge(String userNo);

    MileByPosition mileByPosition(String userNo);

    MileByJob mileByJob(String userNo);

}
