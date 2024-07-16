package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MileHistoryService {

    @Autowired
    private MileageDao mileageDao;


}
