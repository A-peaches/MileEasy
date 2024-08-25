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
    private List<String> texts;  // 각 수신자에게 보낼 메시지 배열
    private String text;
    private String mile;
    private String messageTemplate;
}
