package com.kbstar.mileEasy.beans;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MyMiles {
    private int mile_no;
    private String mile_name;
    private int user_point;
    private int mile_max;
    private int all_point;
    private String mile_date;
    private boolean mile_is_branch;
}
