package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.MileRecommand;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MileService {

    @Autowired
    private MileageDao mileageDao;

    public ArrayList<Mileage> getMileage() {
        return mileageDao.getMileage();
    }


    public MileRecommand getRecommand(String userNo) {
        List<MileRecommand> list = mileageDao.getRecommand(userNo);
        int randomNum = (int) (Math.random() * list.size());
        System.out.println("randomNum : " + randomNum);
        return list.get(randomNum);
    }
}
