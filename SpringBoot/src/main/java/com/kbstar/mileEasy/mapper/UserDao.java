package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.LoginHistory;
import com.kbstar.mileEasy.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.lang.reflect.Array;
import java.util.*;

@Mapper
public interface UserDao {
    User selectUserById(String user_no);

    ArrayList<User> selectAllUser();

    ArrayList<User> selectContactMileage();

    ArrayList<User> selectContactMileEasy();

    User checkedUser(String user_no);

    User selectUserByEmail(String user_no);

    int updatePW(String tempPw, String user_no);

    void loginHistory(String userNo);


    ArrayList<LoginHistory> loginHistoryCountArray(String startDate, String endDate);

    ArrayList<User> levelChartData(String date);

    ArrayList<User> getileageAdminList(String mileNo);

    ArrayList<User> searchUser();

    void clearManager(String mileNo);

    void newManager(String mileNo, List<String> adminList);

    int getNextMonthlyKingNo();

    void insertMonthlyKings(List<String> king);

    void insertMonthlyJumps(List<String> jump);


    void insertRequestMileage(String isBranch, String mileName, String milMax, String admin, String etc, int request_no, String user_no, int mile_no);

   // void insertRequestMileage(boolean isBranch, String mileName, String milMax, String admin, String etc, int request_no);

    boolean changPassword(String encryptedPassword, String userNo);

    ArrayList<User> getAllUsers();
}