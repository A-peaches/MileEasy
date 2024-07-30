package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Mileage_request;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface MileageRequestDao {

    ArrayList<Mileage_request> requestList(String user_no);
}
