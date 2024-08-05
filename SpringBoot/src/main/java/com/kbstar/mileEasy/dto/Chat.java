package com.kbstar.mileEasy.dto;

import lombok.*;

@NoArgsConstructor
@ToString
@AllArgsConstructor
@Getter
@Setter
public class Chat {
    private int  char_no;
    private String chat_tag;
    private String chat_content;
}
