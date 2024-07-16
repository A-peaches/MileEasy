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
public class MtipReply {
    private int mtip_reply_no;
    private String user_no;
    private String user_name;
    private int mtip_board_no;
    private String mtip_reply_content;
    private Timestamp mtip_reply_date;
}
