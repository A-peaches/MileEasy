package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.beans.MileByAge;
import com.kbstar.mileEasy.beans.MileByJob;
import com.kbstar.mileEasy.beans.MileByPosition;
import com.kbstar.mileEasy.dto.MileExcel;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

@Service
public class MileScoreService {

    @Autowired
    private MileageDao mileageDao;

    public ArrayList<MileScore> getMileScore(String userNo) {
        return mileageDao.getMileScore(userNo);
    }

    public int addMileExcel(String mile_no, String mile_excel_file) { return mileageDao.insertMileExcel(mile_no, mile_excel_file); }
    public List<MileExcel> getMileExcel(String selectedDate){ return mileageDao.selectMileExcel(selectedDate);}
    public List<MileExcel> totalExcel(String mile_no){ return mileageDao.selectTotalExcel(mile_no);}


    public ArrayList<MileScore> kingData() {return  mileageDao.kingData();   }

    public MileByAge getMileAge(String userNo) {
        return mileageDao.mileByAge(userNo);
    }

    public MileByPosition getMilePosition(String userNo) {
        return mileageDao.mileByPosition(userNo);
    }

    public MileByJob getMileJob(String userNo) {
        return mileageDao.mileByJob(userNo);
    }
}
