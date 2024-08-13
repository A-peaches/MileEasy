package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.dto.ChatGPTRequest;
import com.kbstar.mileEasy.dto.ChatGPTResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/bot")
public class CustomBotController {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate template;

    @GetMapping("/chat")
    public String chat(@RequestParam(name = "prompt") String prompt){
        System.out.println("gpt시작!!");
        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGPTResponse =  template.postForObject(apiURL, request, ChatGPTResponse.class);
        assert chatGPTResponse != null;
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @PostMapping("/chat")
    public String Postchat(@RequestParam(name = "prompt") String prompt){
        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGPTResponse =  template.postForObject(apiURL, request, ChatGPTResponse.class);

        assert chatGPTResponse != null;
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @PostMapping("/sms")
    public String PostchatMMS(@RequestParam(name = "prompt") String prompt){
        ChatGPTRequest request = new ChatGPTRequest(model, prompt);
        ChatGPTResponse chatGPTResponse =  template.postForObject(apiURL, request, ChatGPTResponse.class);

        assert chatGPTResponse != null;
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

}