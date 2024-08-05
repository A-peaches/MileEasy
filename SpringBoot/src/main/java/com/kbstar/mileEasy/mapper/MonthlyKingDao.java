package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.Mileage_request;
import com.kbstar.mileEasy.dto.MonthlyKing;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;
public interface MonthlyKingDao {
    ArrayList<MonthlyKing> badgeList();
}
