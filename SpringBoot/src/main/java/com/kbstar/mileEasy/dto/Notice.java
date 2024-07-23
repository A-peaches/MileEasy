package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Notice {
    private int notice_board_no;
    private String user_no;
    private String user_name;
    private String notice_board_title;
    private String notice_board_content;
    private String notice_board_file;
    private Timestamp notice_board_date;
    private int notice_board_hit;
    private boolean notice_board_is_delete;
    private int mile_no;
    private String mile_name; // mileage 테이블의 mile_name 필드 추가
}
