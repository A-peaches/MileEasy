package com.kbstar.mileEasy.service.monthlyKing;


import com.kbstar.mileEasy.dto.MonthlyKing;
import com.kbstar.mileEasy.mapper.MonthlyKingDao;
import com.kbstar.mileEasy.mapper.MtipDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class MonthlyKingService {

    @Autowired
    private MonthlyKingDao monthlyKingDao;

    public ArrayList<MonthlyKing> badgeList() {
        return monthlyKingDao.badgeList();
    }
}
