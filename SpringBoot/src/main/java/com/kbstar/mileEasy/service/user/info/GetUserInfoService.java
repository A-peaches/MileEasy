package com.kbstar.mileEasy.service.user.info;

import com.kbstar.mileEasy.mapper.UserDao;
import com.kbstar.mileEasy.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GetUserInfoService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private EmailService emailService;

    public User getUserById(String user_no) {
        return userDao.selectUserById(user_no);
    }

    public ArrayList<User> getAllUser() {
        return userDao.selectAllUser();
    } //getAllUser 실행 -> mapper : userDao.selectAllUser() 실행 ->  ArrayList<User>형태로 내용을 받음 -> 다시 컨트롤러로 돌아감

    public User checkedUser(String user_no, String user_pw) {
        return userDao.checkedUser(user_no, user_pw);
    }

    public boolean resetPassword(String user_no, String user_email){
        User user = userDao.selectUserByEmail(user_no);

        if(user != null){
            String tempPw = UUID.randomUUID().toString().substring(0, 8); // 임시 비밀번호는 8자리 문자열로 생성
            System.out.println("임시 비밀번호는? "+ tempPw);
            emailService.sendEmail(user_email, tempPw); // 임시 비밀번호를 이메일로 전송
            int result = emailService.updatePassword(user_no, tempPw); // 임시 비밀번호로 사용자 정보 업데이트
            if(result>0){
                return true;
            }
            return false;
        }else{
            return false;
        }
    }
}
