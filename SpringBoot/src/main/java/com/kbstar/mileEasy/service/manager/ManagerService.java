package com.kbstar.mileEasy.service.manager;

import com.kbstar.mileEasy.beans.PageCount;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.mapper.ManagerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.Year;
import java.util.*;

@Service
public class ManagerService {

    @Autowired
    private ManagerDao managerDao;

    public User getMileTitle(String user_no) {
        return managerDao.selectMileTitle(user_no);
    }

    public List<MileRecommand> getRecommand(String mile_no){
        return managerDao.selectMileRecommand(mile_no);
    }

    public List<MileIntroduce> getMileDetail(String mile_no) {
        return managerDao.selectMileDetail(mile_no);
    }
    public List<Target> getTargets(int mile_no) {
        return managerDao.selectMileTarget(mile_no);
    }
    public int addTarget(int mile_no, String user_no, Date start_date, Date end_date, int target_mileage, boolean is_manager_plan){
        return managerDao.insertTarget(mile_no, user_no, start_date, end_date, target_mileage, is_manager_plan);
    }

    public int addMileage(String mile_no, String mile_title, String mile_content, String mile_route) {
        return managerDao.insertMile(Integer.parseInt(mile_no), mile_title, mile_content, mile_route);
    }
    public int addMileageDetail(String mile_no, String mile_title, String job_name){
        return managerDao.insertMileDetail(mile_no, mile_title, job_name);
    }
    public int deleteMile(String mile_introduce_no) {
        return managerDao.deleteMile(mile_introduce_no);
    }
    public int deleteMileDetail(String mile_introduce_no) { return managerDao.deleteMileDetail(mile_introduce_no);}
    public MileIntroduce mileModifyDetail(String mile_introduce_no, String mile_no) {
        return managerDao.selectModifyMile(mile_introduce_no, mile_no);
    }

    public int updateMileage(String mile_title, String mile_content, String mile_route, String mile_introduce_no) {
        return managerDao.updateMile(mile_title, mile_content, mile_route, Integer.parseInt(mile_introduce_no));
    }

    public int updateMileageDetail(String mile_introduce_no, String job_name){
        return managerDao.updateMileDetail(mile_introduce_no, job_name);
    }

    public int updateMileRecommand(String mile_mention, String mile_recommand_no){
        return managerDao.updateRecommand(mile_mention, Integer.parseInt(mile_recommand_no));
    }

    public int addMileRecommand(String mile_no, String mile_mention){
        return managerDao.insertRecommand(mile_no, mile_mention);
    }

    public int deleteMileRecommand(String mile_recommand_no){
        return managerDao.deleteRecommand(mile_recommand_no);
    }





    public Map<String, List<PageCount>> visitCount(String mile_no) {
        List<PageCount> visitCounts = managerDao.visitCount(mile_no);

        List<PageCount> thisYearVisits = new ArrayList<>();
        List<PageCount> lastYearVisits = new ArrayList<>();

        int currentYear = Year.now().getValue();
        int lastYear = currentYear - 1;

        for (PageCount count : visitCounts) {
            String[] yearMonth = count.getYear_and_month().split("-");
            int year = Integer.parseInt(yearMonth[0]);

            if (year == currentYear) {
                thisYearVisits.add(count);
            } else if (year == lastYear) {
                lastYearVisits.add(count);
            }
        }

        Map<String, List<PageCount>> result = new HashMap<>();
        result.put("thisYear", thisYearVisits);
        result.put("lastYear", lastYearVisits);

        return result;
    }

    public  Map<String, List<MileScore>> mileageCount(String mile_no) {
        List<MileScore> mileageCounts = managerDao.mileageCount(mile_no);

        List<MileScore> thisYearPoints = new ArrayList<>();
        List<MileScore> lastYearPoints = new ArrayList<>();

        int currentYear = Year.now().getValue();
        int lastYear = currentYear - 1;

        for (MileScore points : mileageCounts) {
            String[] yearMonth = points.getYear_and_month().split("-");
            int year = Integer.parseInt(yearMonth[0]);

            if (year == currentYear) {
                thisYearPoints.add(points);
            } else if (year == lastYear) {
                lastYearPoints.add(points);
            }
        }

        Map<String, List<MileScore>> result = new HashMap<>();
        result.put("thisYear", thisYearPoints);
        result.put("lastYear", lastYearPoints);

        return result;
    }

    public ArrayList<HitMile> mileCount(String start, String end, String mile) {return managerDao.mileCount(start,
            end,
            mile);
    }
}