package com.kbstar.mileEasy.service.user.info;

import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String tempPw) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("마일이지 임시 비밀번호 발급");
        message.setText("임시 비밀번호는 다음과 같습니다: "+tempPw);
        mailSender.send(message);
    }

    public int updatePassword(String user_no, String tempPw){
        return userDao.updatePW(tempPw, user_no);
    }


}
