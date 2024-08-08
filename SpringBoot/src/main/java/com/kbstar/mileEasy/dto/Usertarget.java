package com.kbstar.mileEasy.dto;


import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Usertarget {
    private int userTargetNo;
    private String userNo;
    private int targetNo;
    private int mileNo;
    private Timestamp startDate;
    private Timestamp endDate;
    private Integer targetMileage;
    private boolean isTogether;
}
