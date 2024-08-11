package com.kbstar.mileEasy.service.gpt;



import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.mapper.ChatDao;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;


@Service
public class AiReportService {
    @Autowired
    private MileageDao mileageDao;

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
}