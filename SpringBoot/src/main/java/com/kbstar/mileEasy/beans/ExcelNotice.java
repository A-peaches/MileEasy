package com.kbstar.mileEasy.beans;


import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class ExcelNotice {
    private int mile_no;
    private String mile_excel_file;
    private String mile_excel_date;
    private String mile_name;
    private boolean mile_is_branch;
    private String mile_description;
}
