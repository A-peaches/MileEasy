package com.kbstar.mileEasy.user.service;

import com.kbstar.mileEasy.mapper.UserDao;
import com.kbstar.mileEasy.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public User getUserById(String user_no) {
        return userDao.selectUserById(user_no);
    }

    public ArrayList<User> getAllUser() {
        return userDao.selectAllUser();
    }
}
