package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Date;
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class MonthlyKing {
    private int monthly_king_no;
    private String user_no;
    private boolean is_king;
    private boolean is_jump;
    private Date monthly_king_date;
}
