package com.kbstar.mileEasy.dto;

import lombok.*;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class MileRecommand {
    private int mile_recommand_no;
    private int mile_no;
    private String mile_mention;
    private String mile_link;
}
