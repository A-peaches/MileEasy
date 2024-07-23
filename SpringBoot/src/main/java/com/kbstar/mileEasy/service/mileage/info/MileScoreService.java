package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MileScoreService {

    @Autowired
    private MileageDao mileageDao;

    public ArrayList<MileScore> getMileScore(String userNo) {
        return mileageDao.getMileScore(userNo);
    }

    public ArrayList<MileScore> kingData() {return  mileageDao.kingData();   }
}
