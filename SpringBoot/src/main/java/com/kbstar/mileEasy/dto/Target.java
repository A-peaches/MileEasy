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
    private String mile_name;
    private String user_no;
    private Date  start_date;
    private Date end_date;
    private int target_mileage;
    private boolean is_together;
    private boolean is_manager_plan;
    private int totalParticipants;  // 총 참가자 수
    private int achievedCount;      // 달성한 사람 수
    private int notAchievedCount;   // 미달성한 사람 수
    private String not_achieved_names; // 미달성한 사람들의 이름 (','로 구분된 문자열)
    private String not_achieved_phones;// 미달성한 사람들의 전화번호 (','로 구분된 문자열)

}
