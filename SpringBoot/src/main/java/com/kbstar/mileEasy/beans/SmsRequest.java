package com.kbstar.mileEasy.beans;

import lombok.*;

import java.util.List;

@ToString
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class SmsRequest {
    private List<String> to;
    private String text;
    private String mile;

}
