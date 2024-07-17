package com.kbstar.mileEasy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

@ToString
@AllArgsConstructor
@Getter
@Setter
public class QnABoard {
    private int qna_board_no;
    private String user_no;
    private String user_name;
    private int mile_no;
    private String qna_board_title;
    private String qna_board_content;
    private Timestamp qna_board_date;
    private int mtip_board_answer;
    private boolean qna_board_is_deleted;
}