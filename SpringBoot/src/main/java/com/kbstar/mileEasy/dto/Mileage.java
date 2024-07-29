package com.kbstar.mileEasy.dto;

import lombok.*;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class Mileage {
    private int mile_no;
    private String mile_name;
    private int mile_max;
    private String mile_description;
    private boolean mile_is_delete;
    private boolean mile_is_branch;
}
