package com.kbstar.mileEasy.service.gpt;



import com.kbstar.mileEasy.dto.AIReport;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.mapper.AiRepooetDao;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
public class AiReportService {
    @Autowired
    private MileageDao mileageDao;

    @Autowired
    private AiRepooetDao aiRepooetDao;

    public ArrayList<MileScore> allScore() {
        return mileageDao.allScore();
    }

    public ArrayList<MileScore> myScore(String userNo) {
        return mileageDao.myScore(userNo);
    }

    public ArrayList<MileScore> avgScore() {
        return mileageDao.avgScore();
    }

    public ArrayList<MileScore> percentageScore(String userNo) {
        return mileageDao.percentageScore(userNo);
    }

    public ArrayList<MileScore> myGroup(String userNo) {
        return mileageDao.myGroup(userNo);
    }

    public ArrayList<MileScore> group_weight(String userNo) {
        return mileageDao.group_weight(userNo);
    }

    public ArrayList<MileScore> group_weight_avg(int groupNo) {
        return mileageDao.group_weight_avg(groupNo);
    }

    public ArrayList<MileScore> my_weight_avg(String userNo, int groupNo) {
        return mileageDao.my_weight_avg(userNo,groupNo);
    }

    public void saveChat(String user_no,String chat, String myScoreJson, String avgScoreJson, String percentageJson) {
        aiRepooetDao.saveChat(user_no,chat,myScoreJson,avgScoreJson,percentageJson);
    }

    public int findIndex() {
        return aiRepooetDao.findIndex();
    }

    public void saveRanking(int no, String content) {
        aiRepooetDao.saveRanking(no,content);
    }

    public void saveCatch(int no, String content) {
        aiRepooetDao.saveCatch(no,content);
    }

    public void saveMile(int no, String content) {
        aiRepooetDao.saveMile(no,content);
    }

    public AIReport getAiReport(int userNo) {
        return aiRepooetDao.getAiReport(userNo);
    }
}