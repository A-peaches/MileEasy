package com.kbstar.mileEasy.beans;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MileByAge {
    private int mile20;
    private int mile30;
    private int mile40;
    private int mile50;
    private int user_age;
    private int user_sum;
    private String mile_date;
}
