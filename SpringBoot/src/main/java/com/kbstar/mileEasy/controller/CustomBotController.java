package com.kbstar.mileEasy.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kbstar.mileEasy.dto.AIReport;
import com.kbstar.mileEasy.dto.ChatGPTRequest;
import com.kbstar.mileEasy.dto.ChatGPTResponse;
import com.kbstar.mileEasy.dto.MileScore;
import com.kbstar.mileEasy.service.FileReader;
import com.kbstar.mileEasy.service.gpt.AiReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;


import java.io.IOException;
import java.util.ArrayList;
import java.util.Map;

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
        String percentageJson = objectMapper.writeValueAsString(percentageScore.get(0).getUser_percentile());

        // StringBuilder를 사용하여 프롬프트를 생성합니다.
        StringBuilder fullPromptBuilder = new StringBuilder();
        fullPromptBuilder.append("다음은 마일리지 시스템의 데이터 분석 결과입니다:\n\n");
        fullPromptBuilder.append("\n\n 상위10명에 대한 사용자의 총점: ").append(allScoreJson);
        fullPromptBuilder.append("\n\n나의 마일리지 점수: ").append(myScoreJson);
        fullPromptBuilder.append("\n\n각 마일리지별 평균 마일리지점수: ").append(avgScoreJson);
        fullPromptBuilder.append("\n\n나의 상위 퍼센티지: ").append(percentageJson).append("%");
        fullPromptBuilder.append("\n\n이 정보를 바탕으로, 다음 형식으로 응답을 작성해주세요:");
        fullPromptBuilder.append("\n\n[이름]님은 상위 [퍼센티지]%에 해당하며, 전반적으로 [성과 평가]를 보이고 있습니다.");
        fullPromptBuilder.append("\n\n[개선이 필요한 영역]에 조금 더 집중하시면, 연말 평가에서 더욱 좋은 결과를 얻으실 수 있을 것으로 예상됩니다.");
        fullPromptBuilder.append("\n\n응답에서 [성과 평가]는 전체적인 성과를 간단히 평가하고, [개선이 필요한 영역]은 평균보다 낮은 마일리지 항목을 언급해주세요. 간결하게 답변해줘");
        fullPromptBuilder.append(prompt);

        String fullPrompt = fullPromptBuilder.toString();

        // ChatGPTRequest 객체를 생성하여 API 요청을 보냅니다.
        ChatGPTRequest request = new ChatGPTRequest(model, fullPrompt);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);

        assert chatGPTResponse != null;
        aiReportService.saveChat(user_no, chatGPTResponse.getChoices().get(0).getMessage().getContent(), myScoreJson, avgScoreJson, percentageJson);
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @PostMapping("/chatRank")
    public String chatRank(@RequestParam(name = "prompt") String prompt,
                           @RequestParam(name = "user_no") String user_no) throws JsonProcessingException {
        ArrayList<MileScore> allScore = aiReportService.allScore();
        ArrayList<MileScore> myScore = aiReportService.myScore(user_no);
        ArrayList<MileScore> avgScore = aiReportService.avgScore();
        ArrayList<MileScore> percentageScore = aiReportService.percentageScore(user_no);

        ObjectMapper objectMapper = new ObjectMapper();
        String allScoreJson = objectMapper.writeValueAsString(allScore);
        String myScoreJson = objectMapper.writeValueAsString(myScore);
        String avgScoreJson = objectMapper.writeValueAsString(avgScore);
        String percentageJson = objectMapper.writeValueAsString(percentageScore.get(0).getUser_percentile());

        // StringBuilder를 사용하여 프롬프트를 생성합니다.
        StringBuilder fullPromptBuilder = new StringBuilder();
        fullPromptBuilder.append("다음은 마일리지 시스템의 데이터 분석 결과입니다:\n\n");
        fullPromptBuilder.append("\n\n 상위10명에 대한 사용자의 총점: ").append(allScoreJson);
        fullPromptBuilder.append("\n\n나의 마일리지 점수: ").append(myScoreJson);
        fullPromptBuilder.append("\n\n각 마일리지별 평균 마일리지점수: ").append(avgScoreJson);
        fullPromptBuilder.append("\n\n나의 상위 퍼센티지: ").append(percentageJson).append("%");
        fullPromptBuilder.append("\n\n이 정보를 바탕으로, 다음 형식으로 응답을 작성해주세요:");
        fullPromptBuilder.append("\n\n[이름]님은 전체 직원 중 상위 [퍼센티지]%에 위치해 있으며, [성과 평가]를 보여주고 계십니다. ");
        fullPromptBuilder.append("\n\n다음 분기까지 '[낮은 마일리지 항목]' 마일리지를 [순위 상승을 위한 필요 점수]점 추가로 획득하시면 귀하의 전체 순위가 [예상 순위 상승]% 정도 상승할 것으로 예상됩니다.");
        fullPromptBuilder.append("\n\n응답에서 [성과 평가]는 전체적인 성과를 간단히 평가해주세요. 간결하게 답변해줘");
        fullPromptBuilder.append(prompt);

        String fullPrompt = fullPromptBuilder.toString();

        // ChatGPTRequest 객체를 생성하여 API 요청을 보냅니다.
        ChatGPTRequest request = new ChatGPTRequest(model, fullPrompt);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);

        int no = aiReportService.findIndex();
        assert chatGPTResponse != null;
        aiReportService.saveRanking(no, chatGPTResponse.getChoices().get(0).getMessage().getContent());
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }

    @PostMapping("/chatCatchup")
    public String chatCatchup(@RequestParam(name = "prompt") String prompt,
                              @RequestParam(name = "user_no") String user_no) throws JsonProcessingException {

        System.out.println("===================================================");
        ArrayList<MileScore> allScore = aiReportService.allScore();
        ArrayList<MileScore> myScore = aiReportService.myScore(user_no);

        ObjectMapper objectMapper = new ObjectMapper();
        String allScoreJson = objectMapper.writeValueAsString(allScore);
        String myScoreJson = objectMapper.writeValueAsString(myScore);

        // StringBuilder를 사용하여 프롬프트를 생성합니다.
        StringBuilder fullPromptBuilder = new StringBuilder();
        fullPromptBuilder.append("다음은 마일리지 시스템의 데이터 분석 결과입니다:\n\n");
        fullPromptBuilder.append("\n\n 상위10명에 대한 사용자의 총점: ").append(allScoreJson);
        fullPromptBuilder.append("\n\n나의 마일리지 점수: ").append(myScoreJson);
        fullPromptBuilder.append("\n\n이 정보를 바탕으로, 다음 형식으로 응답을 작성해주세요:");
        fullPromptBuilder.append("\n\n현재 1등과의 점수 차이는 [점수 차이]점입니다. 연말까지 1등을 추격하려면 ");
        fullPromptBuilder.append("\n\n\"\\n\\n하루 평균 [일일 필요 점수]점의 마일리지를 쌓으셔야 합니다.");
        fullPromptBuilder.append("\n\n응답에서 [점수 차이]와 [일일 필요 점수]는 정수로 반올림하여 표시해주세요.");
        fullPromptBuilder.append("\n\n응답에서 글자수는 50자 이내로 해줘 형식을 무조건 으로 따르고 다른 부가 정보는 없애줘");
        fullPromptBuilder.append(prompt);

        String fullPrompt = fullPromptBuilder.toString();

        // ChatGPTRequest 객체를 생성하여 API 요청을 보냅니다.
        ChatGPTRequest request = new ChatGPTRequest(model, fullPrompt);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);

        int no = aiReportService.findIndex();
        assert chatGPTResponse != null;
        aiReportService.saveCatch(no, chatGPTResponse.getChoices().get(0).getMessage().getContent());
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }


    @PostMapping("/chatMile")
    public String chatMile(@RequestParam(name = "prompt") String prompt,
                           @RequestParam(name = "user_no") String user_no) throws JsonProcessingException {
        ArrayList<MileScore> myGroup = aiReportService.myGroup(user_no);
        ArrayList<MileScore> groupWeight = aiReportService.group_weight(user_no);
        ArrayList<MileScore> groupWeightAvg = aiReportService.group_weight_avg(groupWeight.get(0).getGroup_no());
        ArrayList<MileScore> myWeightAvg = aiReportService.my_weight_avg(user_no, groupWeight.get(0).getGroup_no());

        ObjectMapper objectMapper = new ObjectMapper();
        String groupWeightJson = objectMapper.writeValueAsString(groupWeight);
        String groupWeightAvgJson = objectMapper.writeValueAsString(groupWeightAvg);
        String myWeightAvgJson = objectMapper.writeValueAsString(myWeightAvg);

        // StringBuilder를 사용하여 프롬프트를 생성합니다.
        StringBuilder fullPromptBuilder = new StringBuilder();
        fullPromptBuilder.append("다음은 마일리지 시스템의 데이터 분석 결과입니다:\n\n");
        fullPromptBuilder.append("\n\n 속해있는 지역영업그룹 이름 : ").append(myGroup.get(0).getGroup_name());
        fullPromptBuilder.append("\n\n속해있는 지역영업그룹의 가중치 정보: ").append(groupWeightJson);
        fullPromptBuilder.append("\n\n사용자의 그룹 평균 데이터: ").append(groupWeightAvgJson);
        fullPromptBuilder.append("\n\n나의 마일리지별 점수: ").append(myWeightAvgJson);
        fullPromptBuilder.append("\n\n위 데이터를 분석하여 다음 세 가지 항목에 대해 정확히 응답해주세요. 각 응답은 제시된 형식을 정확히 따라야 합니다:");
        fullPromptBuilder.append("[이름]님이 속한 [그룹 이름] 그룹에서는 [마일리지 이름] 마일리지의 가중치가 가장 높습니다. 이 활동에 집중하시면 더 빠른 마일리지 점수 상승이 가능할 것으로 보입니다. ");
        fullPromptBuilder.append("다른 직원들에 비해 '[마일리지 이름]' 마일리지가 [퍼센트]% 낮은 편입니다. 이 영역에 조금 더 신경 쓰시면 전체 순위 상승에 도움이 될 것 같습니다. ");
        fullPromptBuilder.append("'[마일리지 이름]' 부문에서 탁월한 성과를 보여주셨습니다. [이름]님의 꾸준한 노력과 [마일리지 이름]에 대한 관심도가 전체 마일리지 평균 점수를 크게 향상시켰습니다. 이는 매우 가치 있는 기여입니다. 꾸준히 유지해주세요.");
        fullPromptBuilder.append("각 항목에 대해 위 형식을 정확히 따라 응답해주세요. 추가적인 설명이나 다른 형식의 응답은 하지 마세요. 간결하게 답변해줘");
        fullPromptBuilder.append(prompt);

        String fullPrompt = fullPromptBuilder.toString();

        // ChatGPTRequest 객체를 생성하여 API 요청을 보냅니다.
        ChatGPTRequest request = new ChatGPTRequest(model, fullPrompt);
        ChatGPTResponse chatGPTResponse = template.postForObject(apiURL, request, ChatGPTResponse.class);

        int no = aiReportService.findIndex();
        assert chatGPTResponse != null;
        aiReportService.saveMile(no, chatGPTResponse.getChoices().get(0).getMessage().getContent());
        return chatGPTResponse.getChoices().get(0).getMessage().getContent();
    }
    @PostMapping("/getAiReport")
    public ResponseEntity<?> chatMile(@RequestParam(name = "user_no") int user_no) throws JsonProcessingException {

        AIReport aiReport = aiReportService.getAiReport(user_no);

        if (aiReport == null) {
            // Null인 경우 false 반환
            return ResponseEntity.ok(Map.of("success", false));
        }

        // Null이 아닌 경우 데이터 반환
        return ResponseEntity.ok(Map.of("success", true, "data", aiReport));
    }









}