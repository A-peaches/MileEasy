package com.kbstar.mileEasy.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@Getter
@Setter
public class Favorite {
    private int favorite_no;
    private String user_no;
    private int mile_no;
}
