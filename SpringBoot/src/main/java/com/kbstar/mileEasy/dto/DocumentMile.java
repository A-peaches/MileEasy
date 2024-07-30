package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class DocumentMile {
    private String document_mile_no;
    private String mile_no;
    private Timestamp document_date;
    private String document_file;
    private String document_title;
    private String document_content;
    private String mile_name;
}
