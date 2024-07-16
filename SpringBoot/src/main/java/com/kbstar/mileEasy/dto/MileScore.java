package com.kbstar.mileEasy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@ToString
@AllArgsConstructor
@Getter
@Setter
public class MileScore {
    private int mile_score_no;
    private String user_no;
    private int mile_no;
    private Date mile_score_date;
    private String mile_score_name;
    private int mile_score_point;
}
