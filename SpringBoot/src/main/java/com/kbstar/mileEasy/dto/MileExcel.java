package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class MileExcel {
    private String mile_excel_no;
    private String mile_no;
    private String mile_excel_file;
    private Timestamp mile_excel_date;
    private boolean mile_excel_is_delete;
}
