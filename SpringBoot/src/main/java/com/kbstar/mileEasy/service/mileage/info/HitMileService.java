package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.HitMile;
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

    public ArrayList<HitMile> getHitMile() {
        ArrayList<HitMile> a = mileageDao.getHitMile();
        System.out.println(a);
        return mileageDao.getHitMile();
    }

    public ArrayList<HitMile> getHitMileDATE(String date) {
        return mileageDao.getHitMileDATE(date);
    }
}
