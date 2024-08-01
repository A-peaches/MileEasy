package com.kbstar.mileEasy.beans;

import lombok.*;

import java.util.Map;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PageCount {
    private String current_month_visits;
    private String previous_month_visits;
    private Map<String, Integer> monthlyVisits; // 월별 방문자 수를 저장하는 맵
    private String month;
    private int visits;
}
