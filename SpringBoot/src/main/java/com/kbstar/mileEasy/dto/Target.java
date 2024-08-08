package com.kbstar.mileEasy.dto;

import lombok.*;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Target {
    private int target_no;
    private String mile_no;
    private String user_no;
    private String start_date;
    private String end_date;
    private int target_mileage;
    private boolean is_together;
    private boolean is_manager_plan;
    private String month;
    private int achievement_rate;
}
