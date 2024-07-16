package com.kbstar.mileEasy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
@Setter
public class Attendance {
    private int attendance_id;
    private String user_no;
    private String attendance_date;
}
