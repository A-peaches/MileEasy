package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.beans.MyMiles;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface MyMileDao {

    List<MyMiles> getMyMiles(String userNo);
}