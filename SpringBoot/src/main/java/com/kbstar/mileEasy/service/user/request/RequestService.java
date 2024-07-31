package com.kbstar.mileEasy.service.user.request;

import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RequestService {

    @Autowired
    private UserDao userDao;
    private PasswordEncoder passwordEncoder;

    public void insertRequestMileage(boolean isBranch, String mileName, String milMax, String admin, String etc ,int request_no) {
        userDao.insertRequestMileage(isBranch,mileName,milMax,admin,etc,request_no);
    }


    public boolean changePassword(String password, String user_no) {
      passwordEncoder = new BCryptPasswordEncoder();

      String encryptedPassword = passwordEncoder.encode(password);
      boolean result = userDao.changPassword(encryptedPassword, user_no);
      return result;
    }
}
