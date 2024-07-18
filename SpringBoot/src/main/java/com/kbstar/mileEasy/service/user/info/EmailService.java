package com.kbstar.mileEasy.service.user.info;

import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private UserDao userDao;


}
