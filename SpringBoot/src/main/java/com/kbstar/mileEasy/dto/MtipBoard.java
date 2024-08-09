package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;
import java.util.ArrayList;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter

public class MtipBoard {
    private int mtip_board_no;
    private String user_no;
    private String user_name;
    private Integer mile_no;
    private String mtip_board_title;
    private String mtip_board_content;
    private String mtip_board_file;
    private Timestamp mtip_board_date;
    private int mtip_board_like;
    private int mtip_board_hit;
    private boolean mtip_board_is_deleted;
    private boolean mtip_board_is_guide;
    private String mile_name;
    private int mtip_reply_no;
    private String mtip_reply_content;
    private Timestamp mtip_reply_date;

}
