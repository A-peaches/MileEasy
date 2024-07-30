package com.kbstar.mileEasy.service.user.request;

import com.kbstar.mileEasy.dto.Mileage_request;
import com.kbstar.mileEasy.mapper.MileageRequestDao;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class RequestService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private MileageRequestDao mileageRequestDao;

    public ArrayList<Mileage_request> requestList(String user_no) { return mileageRequestDao.requestList(user_no);
    }


    public void insertRequestMileage(boolean isBranch, String mileName, String milMax, String admin, String etc ,int request_no, String user_no, int mile_no) {
        userDao.insertRequestMileage(isBranch,mileName,milMax,admin,etc,request_no,user_no,mile_no);
    }
}
