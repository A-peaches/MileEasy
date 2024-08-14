package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.AIReport;

public interface AiRepooetDao {
    void saveChat(String user_no,String chat, String myScoreJson, String avgScoreJson, String percentageJson);

    int findIndex();

    void saveRanking(int no, String content);

    void saveCatch(int no, String content);

    void saveMile(int no, String content);

    AIReport getAiReport(int userNo);
}
