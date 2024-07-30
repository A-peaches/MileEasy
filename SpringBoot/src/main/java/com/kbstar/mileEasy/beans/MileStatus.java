package com.kbstar.mileEasy.beans;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MileStatus {
    private String score_name;
    private int user_point;
    private int prev_point;
    private String mile_name;
    private String mile_date;
    private String prev_date;
    private String job_name;
}
