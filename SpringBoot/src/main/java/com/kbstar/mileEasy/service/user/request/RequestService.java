package com.kbstar.mileEasy.service.user.request;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RequestService {

    @Autowired
    private UserDao userDao;
    private PasswordEncoder passwordEncoder;

    public void insertRequestMileage(boolean isBranch, String mileName, String milMax, String admin, String etc ,int request_no) {
        userDao.insertRequestMileage(isBranch,mileName,milMax,admin,etc,request_no);
    }


    public List<String> changePassword(String password, String user_no) {
      passwordEncoder = new BCryptPasswordEncoder();
      List<String> result = new ArrayList<>();

      User user = userDao.selectUserByEmail(user_no);

      System.out.println( passwordEncoder.matches(password, user.getUser_pw()) + "똑같니?");
      if( passwordEncoder.matches(password, user.getUser_pw())) {
            result.add("실패");
            result.add("변경 전 비밀번호와 동일합니다.");

            return result;
      }

      String encryptedPassword = passwordEncoder.encode(password);
      boolean valid = userDao.changPassword(encryptedPassword, user_no);

      if(valid) {
          result.add("성공");
          result.add("비밀번호 변경이 완료되었습니다.");
      } else {
          result.add("실패");
          result.add("비밀번호 변경에 실패하였습니다.");
      }

      return result;
    }
}