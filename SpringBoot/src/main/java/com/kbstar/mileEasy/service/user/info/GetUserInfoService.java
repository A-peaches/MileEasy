package com.kbstar.mileEasy.service.user.info;

import com.kbstar.mileEasy.mapper.UserDao;
import com.kbstar.mileEasy.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class GetUserInfoService {

    @Autowired
    private UserDao userDao;

    public User getUserById(String user_no) {
        return userDao.selectUserById(user_no);
    }

    public ArrayList<User> getAllUser() {
        return userDao.selectAllUser();
    } //getAllUser 실행 -> mapper : userDao.selectAllUser() 실행 ->  ArrayList<User>형태로 내용을 받음 -> 다시 컨트롤러로 돌아감

    public User checkedUser(String user_no, String user_pw, boolean user_is_admin) {
        return userDao.checkedUser(user_no, user_pw, user_is_admin);
    }
}
