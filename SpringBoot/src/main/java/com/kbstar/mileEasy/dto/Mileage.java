package com.kbstar.mileEasy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
@Setter
public class Mileage {
    private int mile_no;
    private String mile_name;
    private int mile_max;
    private String mile_description;
    private boolean mile_is_delete;
}
