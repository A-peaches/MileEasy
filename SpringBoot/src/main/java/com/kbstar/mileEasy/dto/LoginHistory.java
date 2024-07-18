package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class LoginHistory {
    private int login_history_no;
    private String user_no;
    private Timestamp login_date;
}
