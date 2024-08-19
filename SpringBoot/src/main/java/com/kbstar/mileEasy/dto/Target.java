package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Target {
    private int target_no;
    private int mile_no;
    private String user_no;
    private Date  start_date;
    private Date end_date;
    private int target_mileage;
    private boolean is_together;
    private boolean is_manager_plan;
    private String mile_name;
    private int achievementRate;
    private int participantCount;
    private int totalMileScoreByMileNo;
    private int current_mileage_score;
    private String user_name;
    private int initial_mileage;
    private String user_tel;
    private int start_mileage_score;   // 시작 시점의 마일리지 점수
}
