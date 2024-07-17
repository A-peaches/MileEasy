package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.ArrayList;

@Mapper
public interface UserDao {
    User selectUserById(String user_no);
    ArrayList<User> selectAllUser();
    User checkedUser(String user_no, String user_pw);

    Optional<User> findByEmployeeNumberAndEmail(@Param("employeeNumber") String employeeNumber, @Param("email") String email);

    void updatePassword(@Param("user_no") String user_no, @Param("password") String password);
}
