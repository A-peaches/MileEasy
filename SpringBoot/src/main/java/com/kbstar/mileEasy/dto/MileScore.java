package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Date;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MileScore {
    private int mile_score_no;
    private String user_no;
    private String mile_no;
    private Date mile_score_date;
    private String mile_score_name;
    private int mile_score_point;
    private int mile_prev_score;
    private String mile_link;
    private int  total_score;
    private int ranking;
    private String user_name;
    private String score_increase;
    private String base_date;
    private int total_current_month_points;
    private int total_previous_month_points;
    private Date date;


}
