package com.kbstar.mileEasy.service.user.info;

import com.kbstar.mileEasy.dto.LoginHistory;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoginHistoryService {
    @Autowired
    private UserDao userDao;

    public void loginHistory(String userNo) {
        userDao.loginHistory(userNo);
    }

    public ArrayList<LoginHistory> loginHistoryCountArray(String startDate, String endDate) {
        return userDao.loginHistoryCountArray(startDate,endDate);
    }
}
