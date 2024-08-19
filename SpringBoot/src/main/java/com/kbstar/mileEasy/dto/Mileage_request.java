package com.kbstar.mileEasy.dto;

import lombok.*;

import java.util.Date;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Mileage_request {
    private int mileage_request_no;
    private int request_is_branch;
    private String request_mile_name;
    private int request_mil_max;
    private String request_admin;
    private String request_etc;
    private int request_status;
    private int request;
    private String user_no;
    private int mile_no;
    private String mileage_request_date;
    private String mile_name;
    private String user_name;
    private int register;




}
