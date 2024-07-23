package com.kbstar.mileEasy.dto;

import lombok.*;

import java.sql.Timestamp;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class HitMile {
    private int hit_no;         // 수정: hit_no 필드 추가
    private int mile_no;
    private int hit_count;
    private Timestamp hit_date; // git_date -> hit_date로 수정
}
