package com.kbstar.mileEasy.dto;


import lombok.*;

import java.sql.Date;
import java.sql.Timestamp;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Usertarget {
    private int user_target_no;
    private String user_no;
    private int target_no;
    private int mile_no;
    private String mile_name;
    private Date start_date;
    private Date end_date;
    private Integer target_mileage;
    private boolean is_together;
    private int participantCount;
    private int achievementRate;
    private int totalMileScoreByTargetNo;
    private int mawang_score;
}
