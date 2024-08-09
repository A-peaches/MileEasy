package com.kbstar.mileEasy.dto;


import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GroupWeight {
    private int weight_no;
    private int group_no;
    private int mile_no;
    private double weight;
    private String mile_name;
}
