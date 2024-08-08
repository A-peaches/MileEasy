package com.kbstar.mileEasy.mapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface GroupDao {
    List<Map<String, Object>> getActiveMileages();

    List<Map<String, Object>> getUserMileages(@Param("date") String date, @Param("mileages") List<Map<String, Object>> mileages);

}
