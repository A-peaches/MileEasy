package com.kbstar.mileEasy.beans;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class PageCount {
    private String current_month_visits;
    private String previous_month_visits;
}
