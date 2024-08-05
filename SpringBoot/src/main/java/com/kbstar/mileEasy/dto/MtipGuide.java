package com.kbstar.mileEasy.dto;
import lombok.*;

import java.sql.Timestamp;
@NoArgsConstructor
@ToString
@AllArgsConstructor

@Getter
@Setter
public class MtipGuide {
    private int mtip_guide_no;
    private String user_no;
    private String user_name;
    private String mtip_guide_title;
    private String mtip_guide_content;
    private String mtip_guide_file;
    private Timestamp mtip_guide_date;
    private int mtip_guide_hit;
    private boolean mtip_guide_is_delete;

}
