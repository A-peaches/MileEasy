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
public class HitMile {
    private int hit_no;
    private int mile_no;
    private int hit_count;
    private Timestamp git_date;
}
