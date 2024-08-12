package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.beans.PageCount;
import com.kbstar.mileEasy.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;

@Mapper
public interface ManagerDao {

    User selectMileTitle(String user_no);
    List<MileIntroduce> selectMileDetail(String mile_no);
    int insertMile(int mile_no, String mile_title, String mile_content, String mile_route);
    int insertMileDetail(String mile_no, String mile_title, String job_name);
    int deleteMile(String mile_introduce_no);
    int deleteMileDetail(String mile_introduce_no);
    MileIntroduce selectModifyMile(String mile_introduce_no, String mile_no);
    int updateMile(String mile_title, String mile_content, String mile_route, int mile_introduce_no);
    int updateMileDetail(String mile_introduce_no, String job_name);
    List<MileRecommand> selectMileRecommand(String mile_no);
    List<Target> selectMileTarget(int mile_no);
    int updateRecommand(String mile_mention, int mile_recommand_no);
    int insertRecommand(String mile_no, String mile_mention);
    int deleteRecommand(String mile_recommand_no);
    int insertTarget(int mile_no, String user_no, Date start_date, Date end_date, int target_mileage, boolean is_manager_plan);
    ArrayList<HitMile> mileCount(String start, String end, String mile);


    List<PageCount> visitCount(String mile_no);

    ArrayList<MileScore> mileageCount(String mile_no);
}
