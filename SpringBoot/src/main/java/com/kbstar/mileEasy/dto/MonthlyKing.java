package com.kbstar.mileEasy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

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
