package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.MileIntroduce;
import com.kbstar.mileEasy.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.*;

@Mapper
public interface ManagerDao {

    User selectMileTitle(String user_no);
    List<MileIntroduce> selectMileDetail(String mile_no);
    int insertMile(int mile_no, String mile_title, String mile_content, String mile_route);
}
