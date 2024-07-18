package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.User;
import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface ManagerDao {

    User selectMileTitle(String user_no);

}
