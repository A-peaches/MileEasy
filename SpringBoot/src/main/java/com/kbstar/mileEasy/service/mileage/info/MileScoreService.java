package com.kbstar.mileEasy.service.mileage.info;

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
//    public void addMileScore(List<Map<String, Object>> mile_scores, List<String> mile_score_names){
//        // 기존 mile_score 데이터를 mile_history로 이동
//        mileageDao.moveMileScoreToHistory();
//
//        // mile_scores 데이터를 mile_score 테이블에 삽입
//        for(Map<String, Object> mile_score : mile_scores){
//            mileageDao.insertMileScore(mile_score);
//            List<Integer> scores = (List<Integer>) mile_score.get("scores");
//            for(int i=0; i<scores.size(); i++){
//                Map<String, Object> detailScore = Map.of(
//                        "mile_no", mile_score.get("mile_no"),
//                        "user_no", mile_score.get("user_no"),
//                        "mile_score_date", mile_score.get("mile_score_date"),
//                        "mile_score_name", mile_score_names.get(i),
//                        "mile_score_point", scores.get(i)
//                );
//                mileageDao.insertDetailMileScore(detailScore);
//            }
//        }
//
//    }
    public List<MileExcel> getMileExcel(String selectedDate){ return mileageDao.selectMileExcel(selectedDate);}
    public List<MileExcel> totalExcel(String mile_no){ return mileageDao.selectTotalExcel(mile_no);}
    public ArrayList<MileScore> kingData() {return  mileageDao.kingData();   }

}
