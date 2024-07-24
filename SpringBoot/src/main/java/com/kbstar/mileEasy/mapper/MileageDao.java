package com.kbstar.mileEasy.mapper;

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
import java.util.Map;


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
    void moveMileScoreToHistory(String mile_no);
    void deleteAllMileScore(String mile_no);
    void insertDetailMileScore(Map<String, Object> detailScore);
    List<MileExcel> selectMileExcel(String selectedDate);
    List<MileExcel> selectTotalExcel(String mile_no);
    void moveMileExcelToHistory(String mile_excel_no);
    void deleteAllMileExcel(String mile_excel_no);
    void moveScoreToHistory(String mile_score_date, String mile_no);
    void deleteScore(String mile_score_date, String mile_no);

    ArrayList<MileScore> kingData();

}
