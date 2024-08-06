package com.kbstar.mileEasy.service.admin;

import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.mapper.AdminDao;
import com.kbstar.mileEasy.mapper.MileageDao;
import com.kbstar.mileEasy.mapper.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class AdminService {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private MileageDao mileageDao;



    public ArrayList<User> getileageAdminList(String mileNo) { return userDao.getileageAdminList(mileNo);

    }

    public ArrayList<User> searchUser() { return userDao.searchUser();   }

    public void clearManager(String mileNo){ userDao.clearManager(mileNo);}

    public void newManager(String mileNo,  List<String> adminList) {userDao.newManager(mileNo,adminList);
    }

    public ArrayList<MileScore> lastUpdate() {return mileageDao.lastUpdate();
    }

    public void insertMonthlyKings(List<String> king, List<String> jump) {
        userDao.insertMonthlyKings(king);
        userDao.insertMonthlyJumps(jump);

    }

    public void updateMilename(String mileNameInput, String mileNo) { mileageDao.updateMilename(mileNameInput,mileNo);
    }

    public void updateMileMax(String mileMax, String mileNo) { mileageDao.updateMileMax(mileMax,mileNo);
    }

    public void addMileage(String mileageName, String mileageLimit, int requestIsBranch, int mile_no) {
        mileageDao.addMileage(mileageName,mileageLimit,requestIsBranch, mile_no);
    }

    public int getMaxMileNo() {
        return mileageDao.getMaxMileNo();
    }

    public void updateMileageDescription(int mile_no) {
        mileageDao.updateMileageDescription(mile_no);
    }

    public void updateUser(int mileNo, String manager) {
        mileageDao.updateUser(mileNo,manager);
    }



    // @Autowired
    //private AdminDao adminDao;


}
