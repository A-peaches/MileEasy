package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;
@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class DocumentMile {
    private int document_mile_no;
    private int mile_no;
    private Timestamp document_date;
    private String document_file;
    private String document_title;
    private String document_content;
}
