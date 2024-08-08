package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Target {
    private int targetNo;
    private int mileNo;
    private String userNo;
    private Timestamp startDate;
    private Timestamp endDate;
    private int targetMileage;
    private boolean isTogether;
    private boolean isManagerPlan;

}
