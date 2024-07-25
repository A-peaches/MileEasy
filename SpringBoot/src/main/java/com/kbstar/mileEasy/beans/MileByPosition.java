package com.kbstar.mileEasy.beans;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MileByPosition {
    private int mile_position1;
    private int mile_position2;
    private int mile_position3;
    private int mile_position4;
    private int mile_position5;
    private int user_position;
    private int user_sum;
    private String mile_date;
}
