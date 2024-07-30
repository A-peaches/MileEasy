package com.kbstar.mileEasy.dto;
import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class MileIntroduce {
    private int mile_introduce_no;
    private String mile_no;
    private String mile_title;
    private String mile_content;
    private String mile_route;
    private String job_name;
}
