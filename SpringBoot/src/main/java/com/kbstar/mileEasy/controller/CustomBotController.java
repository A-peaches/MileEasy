package com.kbstar.mileEasy.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kbstar.mileEasy.dto.ChatGPTRequest;
import com.kbstar.mileEasy.dto.ChatGPTResponse;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.service.FileReader;
import com.kbstar.mileEasy.service.gpt.AiReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/bot")
public class CustomBotController {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    @Autowired
    private AiReportService aiReportService;




    @GetMapping("/chat")
    public String chat(@RequestParam(name = "prompt") String prompt){
        System.out.println("gpt시작!!");
        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGPTResponse =  template.postForObject(apiURL, request, ChatGPTResponse.class);
        assert chatGPTResponse != null;
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @PostMapping("/chat")
    public String Postchat(@RequestParam(name = "prompt") String prompt,
                           @RequestParam(name = "user_no") String user_no) throws JsonProcessingException {
        ArrayList<MileScore> allScore = aiReportService.allScore();
        ArrayList<MileScore> myScore = aiReportService.myScore(user_no);
        ArrayList<MileScore> avgScore = aiReportService.avgScore();
        ArrayList<MileScore> percentageScore = aiReportService.percentageScore(user_no);

        ObjectMapper objectMapper = new ObjectMapper();
        String allScoreJson = objectMapper.writeValueAsString(allScore);
        String myScoreJson = objectMapper.writeValueAsString(myScore);
        String avgScoreJson = objectMapper.writeValueAsString(avgScore);
        String percentageJson = objectMapper.writeValueAsString(percentageScore);

        // 프롬프트에 allScoreJson을 추가합니다.
        String fullPrompt = prompt + "\n\nHere is the mile score data: " + allScoreJson + "\n\nHere is the my score data: " + myScoreJson+
                "\n\nHere is the avg score data: " + avgScoreJson + "\n\nHere is the my percentage score data: " + percentageJson;

        // ChatGPTRequest 객체를 생성하여 API 요청을 보냅니다.
        ChatGPTRequest request = new ChatGPTRequest(model, fullPrompt);
        ChatGPTResponse chatGPTResponse =  template.postForObject(apiURL, request, ChatGPTResponse.class);

        assert chatGPTResponse != null;
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }



}