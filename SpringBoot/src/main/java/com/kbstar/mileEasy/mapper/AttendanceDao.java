package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.beans.Attendances;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface AttendanceDao {

    List<Attendances> getRecommand(String userNo);
}
