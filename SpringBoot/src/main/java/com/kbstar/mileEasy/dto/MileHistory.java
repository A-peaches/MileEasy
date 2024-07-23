package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Date;
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class MileHistory {
    private int mile_history_no;
    private String user_no;
    private int mile_no;
    private Date mile_history_date;
    private String mile_history_name;
    private int mile_history_point;
}
