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
}
