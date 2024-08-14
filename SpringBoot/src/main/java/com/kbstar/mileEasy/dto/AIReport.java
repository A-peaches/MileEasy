package com.kbstar.mileEasy.dto;

import lombok.*;
import org.w3c.dom.Text;

import java.util.Date;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class AIReport {
    private int ai_report_index;

    private String user_no;

    private int user_rank;

    private String comprehensive_analysis;

    private String ranking_analysis;

    private String catchup_strategy;

    private String mileage_analyze;

    private Date ai_report_date;


    private String my_score_json; // 변경된 부분
    private String avg_score_json; // 변경된 부분
}
