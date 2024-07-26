package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.MileRecommand;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.mapper.MileageDao;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MileService {

    @Autowired
    private MileageDao mileageDao;

    @Autowired
    private UserDao userDao;

    public ArrayList<Mileage> getMileage() {
        return mileageDao.getMileage();
    }


    public MileRecommand getRecommand(String userNo) {
        List<MileRecommand> list = mileageDao.getRecommand(userNo);
        int randomNum = (int) (Math.random() * list.size());
        System.out.println("randomNum : " + randomNum);
        return list.get(randomNum);
    }

    public ArrayList<User> levelChartData(String date) {
        return userDao.levelChartData(date);
    }

    public void deleteMile(String mileNo) { mileageDao.deleteMile(mileNo);
    }
}
