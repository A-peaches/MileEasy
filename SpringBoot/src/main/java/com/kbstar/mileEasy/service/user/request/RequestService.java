package com.kbstar.mileEasy.service.user.request;

import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private UserDao userDao;

    public void insertRequestMileage(boolean isBranch, String mileName, String milMax, String admin, String etc ,int request_no) {
        userDao.insertRequestMileage(isBranch,mileName,milMax,admin,etc,request_no);
    }
}
