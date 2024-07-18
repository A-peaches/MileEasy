package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class HitMileService {
    @Autowired
    private MileageDao mileageDao;


    public void hitMile(String mileNo) {

        int hitMileCount = mileageDao.getHitMileCount(mileNo);
        System.out.println(hitMileCount);
        if (hitMileCount > 0) {
            mileageDao.updateMile(mileNo);
            System.out.println("update");
        } else {
            mileageDao.insertHitMile(mileNo);
            System.out.println("insert");
        }
    }
}
