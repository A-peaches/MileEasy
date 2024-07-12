package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;

@Mapper
public interface UserDao {
    User selectUserById(String user_no);

    ArrayList<User> selectAllUser();
}
