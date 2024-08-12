package com.kbstar.mileEasy.dto;

import lombok.*;

import java.util.Date;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class GptResponse {
    private int ai_report_index;
    private String user_no;
    private int user_rank;
    private String comprehensive_analysis;
    private String ranking_analysis;
    private String catchup_strategy;
    private String mileage_analyze;
    private Date ai_report_date;

}


