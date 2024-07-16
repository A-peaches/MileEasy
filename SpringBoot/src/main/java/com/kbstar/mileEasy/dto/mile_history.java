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
public class mile_history {
    private int mile_history_no;
    private String user_no;
    private int mile_no;
    private Date mile_history_date;
    private String mile_history_name;
    private int mile_history_point;
}
