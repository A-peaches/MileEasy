package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MileService {

    @Autowired
    private MileageDao mileageDao;

    public ArrayList<Mileage> getMileage() {
        return mileageDao.getMileage();
    }
}
