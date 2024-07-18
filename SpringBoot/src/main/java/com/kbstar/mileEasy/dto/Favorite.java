package com.kbstar.mileEasy.dto;

import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Favorite {
    private int favorite_no;
    private String user_no;
    private String mile_no;
}
