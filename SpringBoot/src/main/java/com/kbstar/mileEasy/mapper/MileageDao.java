package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Mileage;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MileageDao {

    ArrayList<Mileage> getMileage();
}
