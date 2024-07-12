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
public class User {
    private String user_no;
    private String user_email;
    private String user_pw;
    private String user_name;
    private String user_profile;
    private int user_year;
    private Date user_birth;
    private boolean user_is_delete;
    private boolean user_is_manager;
    private boolean user_is_admin;
    private int dp_no;
    private int level_no;
    private int job_no;
    private int position_no;
}
