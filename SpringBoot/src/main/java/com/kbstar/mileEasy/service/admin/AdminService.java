package com.kbstar.mileEasy.service.admin;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.mapper.AdminDao;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class AdminService {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private UserDao userDao;


    public ArrayList<User> getileageAdminList(String mileNo) { return userDao.getileageAdminList(mileNo);

    }

    public ArrayList<User> searchUser() { return userDao.searchUser();   }

    // @Autowired
    //private AdminDao adminDao;


}
