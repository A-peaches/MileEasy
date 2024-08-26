package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.beans.*;

import com.kbstar.mileEasy.dto.DocumentMile;
import com.kbstar.mileEasy.service.mileage.type.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/myMile")
public class MyMileController {

    @Autowired
    private MyMileageService myMileageService;

    // 파일 업로드 경로
    @Value("${project.uploadpath.document}")
    private String documentUploadPath;

    @GetMapping("/getMyMiles/{user_no}")
    public List<MyMiles> getMyMiles(@PathVariable String user_no) {
        List<MyMiles> myMiles = myMileageService.getMyMiles(user_no);
        return myMiles;
    }

    @GetMapping("/getMileStatus/{user_no}/{mile_no}")
    public List<MileStatus>  getMileStatus(@PathVariable String user_no,@PathVariable int mile_no) {
        List<MileStatus> mileStatus = myMileageService.getMileStatus(user_no,mile_no);
        return mileStatus;
    }

    @GetMapping("/getExcelNotice")
    public List<ExcelNotice> getExcelNotice() {
            List<ExcelNotice> excelNotices = myMileageService.getExcelNotice();
            return excelNotices;
    }

    // mileDocument 마일리지 전체 문서 가져오기
    @GetMapping("/mileDocument")
    public List<DocumentMile> mileDocument() {
        List<DocumentMile> mileDocumentList = myMileageService.documnetList();
        return mileDocumentList;
    }

    //countListDocuments 마일리지 총 건수 가져오기
    @GetMapping("/countListDocuments")
    public int getDocumentSum(){
        try{
            int sum = myMileageService.getTotal();
            return sum;
        }catch (Exception e){
            e.printStackTrace();
            return 0;
        }
    }

    @GetMapping("/loadBadgeData/{user_no}")
    public List<BadgeData> loadBadgeData(@PathVariable String user_no) {
        List<BadgeData> badgeData = myMileageService.loadBadgeData(user_no);
        return badgeData;
    }

}
