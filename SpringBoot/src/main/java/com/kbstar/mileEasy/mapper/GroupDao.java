package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.GroupWeight;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


@Mapper
public interface GroupDao {
    List<Map<String, Object>> getActiveMileages();

    List<Map<String, Object>> getUserMileages(@Param("inputDate") String date, @Param("activeMileages") List<Map<String, Object>> activeMileages
    ,@Param("group_no") int group_no);

    List<GroupWeight> getWeight(int groupNo);
}