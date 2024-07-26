package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.*;
import org.apache.ibatis.annotations.Mapper;

import java.util.*;

@Mapper
public interface ManagerDao {

    User selectMileTitle(String user_no);
    List<MileIntroduce> selectMileDetail(String mile_no);
    int insertMile(int mile_no, String mile_title, String mile_content, String mile_route);
    int deleteMile(String mile_introduce_no);
    MileIntroduce selectModifyMile(String mile_introduce_no);
    int updateMile(String mile_title, String mile_content, String mile_route, int mile_introduce_no);
    List<MileRecommand> selectMileRecommand(String mile_no);
    int updateRecommand(String mile_mention, int mile_recommand_no);
    int insertRecommand(String mile_no, String mile_mention);
    int deleteRecommand(String mile_recommand_no);

    ArrayList<HitMile> mileCount(String start, String end, String mile);
}
