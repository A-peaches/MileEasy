package com.kbstar.mileEasy.dto;

import lombok.*;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Attendance {
    private int attendance_id;
    private String user_no;
    private String attendance_date;
}
