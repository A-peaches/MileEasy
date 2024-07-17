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
public class MileExcel {
    private int mile_excel_no;
    private int mile_no;
    private String mile_excel_file;
    private Timestamp mile_excel_date;
    private boolean mile_excel_is_delete;
}
