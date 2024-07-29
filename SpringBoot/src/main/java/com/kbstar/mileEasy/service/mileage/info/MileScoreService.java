package com.kbstar.mileEasy.service.mileage.info;

import com.kbstar.mileEasy.dto.DocumentMile;
import com.kbstar.mileEasy.beans.MileByAge;
import com.kbstar.mileEasy.beans.MileByJob;
import com.kbstar.mileEasy.beans.MileByPosition;
import com.kbstar.mileEasy.dto.MileExcel;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.mapper.MileageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class MileScoreService {

    @Autowired
    private MileageDao mileageDao;

    public ArrayList<MileScore> getMileScore(String userNo) {
        return mileageDao.getMileScore(userNo);
    }
    public int addMileExcel(String mile_no, String mile_excel_file) { return mileageDao.insertMileExcel(mile_no, mile_excel_file); }
    public void deleteMileScore(List<String> mile_excel_date_list, String mile_no){
        for(int i = 0; i < mile_excel_date_list.size(); i++){
            mileageDao.moveScoreToHistory(mile_excel_date_list.get(i), mile_no);
            mileageDao.deleteScore(mile_excel_date_list.get(i), mile_no);
        }
    }
    public void addMileScore(List<Map<String, Object>> mile_scores, List<String> mile_score_names, String mile_no){
        // 기존 mile_score 데이터를 mile_history로 이동
        mileageDao.moveMileScoreToHistory(mile_no);
        mileageDao.deleteAllMileScore(mile_no);

        // mile_scores 데이터를 mile_score 테이블에 삽입
        for(Map<String, Object> mile_score : mile_scores){ // 여기서 map은 하나의 행에 대한 데이터

            List<Integer> scores = (List<Integer>) mile_score.get("scores"); // scores는 상세항목별 점수
            for(int i=0; i<scores.size(); i++){
                Map<String, Object> detailScore = Map.of(
                        "mile_no", mile_score.get("mile_no"),
                        "user_no", mile_score.get("user_no"),
                        "mile_score_date", mile_score.get("mile_score_date"),
                        "mile_score_name", mile_score_names.get(i),
                        "mile_score_point", scores.get(i)
                );
                mileageDao.insertDetailMileScore(detailScore);
            }
        }

    }
    public void deleteMileScoreExcel(List<Map<String, Object>> mileExcels){
        for(Map<String, Object> mileExcel : mileExcels){
            String mile_excel_no = (String) mileExcel.get("mile_excel_no");
            mileageDao.moveMileExcelToHistory(mile_excel_no);
            mileageDao.deleteAllMileExcel(mile_excel_no);
        }
    }
    public int getSum(String mile_no){ return mileageDao.selectMileSum(mile_no);}
    public List<MileExcel> getMileExcel(String selectedDate, String mile_no, int limit, int offset){ return mileageDao.selectMileExcel(selectedDate, mile_no, limit, offset);}
    public List<DocumentMile> totalDocument(String mile_no, int limit, int offset){ return mileageDao.selectTotalDocument(mile_no, limit, offset);}
    public List<DocumentMile> documentsForSearch(String mile_no){ return mileageDao.selectDocumentLists(mile_no);}
    public List<MileExcel> totalExcel(String mile_no, int limit, int offset){ return mileageDao.selectTotalExcel(mile_no, limit, offset);}
    public ArrayList<MileScore> kingData() {return  mileageDao.kingData();   }
    public int addMileageDocument(String mile_no, String document_file) {
        return mileageDao.insertMileDocu(mile_no, document_file);}
    public void deleteMileDocument(List<String> mile_document_no_list){
        for(String num : mile_document_no_list){
            mileageDao.deleteDocument(num);
        }
    }
    public int getCount(String mile_no){ return mileageDao.selectCount(mile_no);}
    public int getCountDocuments(String mile_no){ return mileageDao.selectCountDocu(mile_no);}
    public ArrayList<MileScore> jumpData() { return  mileageDao.jumpData();}

    public ArrayList<MileScore> kingDataSelect() {return  mileageDao.kingDataSelect();
    }

    public ArrayList<MileScore> jumpDataSelect() {return  mileageDao.jumpDataSelect();}

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
