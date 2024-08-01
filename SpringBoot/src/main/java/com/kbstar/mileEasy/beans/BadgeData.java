package com.kbstar.mileEasy.beans;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class BadgeData {
    private boolean mile_is_king;
    private boolean mile_is_jump;
    private String start_date;
    private String end_date;
    private boolean current_month;
}
