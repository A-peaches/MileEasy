package com.kbstar.mileEasy.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MileDetail {
    private int mile_detail_no;
    private int mile_no;
    private String mile_score_name;
    private String jon_name;
}
