package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Date;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class User {
    private String user_no;
    private String user_email;
    private String user_pw;
    private String user_name;
    private int user_year;
    private Date user_birth;
    private boolean user_is_delete;
    private boolean user_is_manager;
    private boolean user_is_admin;
    private String dp_no;
    private String level_no;
    private String job_no;
    private String position_no;
    private String mile_no;
    private int visitorCount;
    private String mile_name;
    private String user_phone;
    private Boolean is_hr;

}
