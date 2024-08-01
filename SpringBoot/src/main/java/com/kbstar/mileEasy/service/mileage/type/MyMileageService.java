package com.kbstar.mileEasy.service.mileage.type;

import com.kbstar.mileEasy.beans.BadgeData;
import com.kbstar.mileEasy.beans.ExcelNotice;
import com.kbstar.mileEasy.beans.MileStatus;
import com.kbstar.mileEasy.beans.MyMiles;
import com.kbstar.mileEasy.dto.DocumentMile;
import com.kbstar.mileEasy.mapper.MileageDao;
import com.kbstar.mileEasy.mapper.MyMileDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyMileageService {

    @Autowired
    private MyMileDao myMileDao;


    public List<MyMiles> getMyMiles(String userNo) {
        return myMileDao.getMyMiles(userNo);
    }

    public List<MileStatus>  getMileStatus(String userNo, int mileNo) {
        return myMileDao.getMileStatus(userNo,mileNo);
    }


    public List<ExcelNotice> getExcelNotice() {
        return myMileDao.getExcelNotice();
    }

    public List<DocumentMile> documnetList(){ return myMileDao.selectMileDocument(); }
    public int getTotal(){return myMileDao.selectCount();}

    public List<BadgeData> loadBadgeData(String userNo) {
        return myMileDao.loadBadgeData(userNo);
    }
}
