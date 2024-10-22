package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.beans.SmsRequest;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.service.Chat.ChatService;
import com.kbstar.mileEasy.service.SmsService;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.monthlyKing.MonthlyKingService;
import com.kbstar.mileEasy.service.user.info.GetUserInfoService;
import com.kbstar.mileEasy.service.user.info.LoginHistoryService;
import com.kbstar.mileEasy.service.user.request.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.Collections.replaceAll;

@RestController
@RequestMapping("/user") // 'http://localhost:8090/user/allUser'  /user 부분!
public class UserController {

    @Autowired
    private GetUserInfoService GetUserInfoService;
    @Autowired
    private LoginHistoryService loginHistoryService;

    @Autowired
    private MileService mileService;

    @Autowired
    private RequestService requestService;

    @Autowired
    private ChatService chatService;

    @Autowired
    private MonthlyKingService monthlyKingService;
    @Autowired
    private GetUserInfoService getUserInfoService;

    @Autowired
    private SmsService smsService;


    @GetMapping("/{user_no}")
    public User user_no(@PathVariable String user_no) {
        User user = GetUserInfoService.getUserById(user_no);
        return user;
    }

    @GetMapping("/allUser")   //'http://localhost:8090/user/allUser'  /allUser 부분!
    public ArrayList<User> allUser() {
        ArrayList<User> users = GetUserInfoService.getAllUser(); //UserService의 getAllUser 실행

        return users; //호출된 곳으로 다시 돌아감!!!
    }

    // 마일리지 담당자 정보 가져오기
    @GetMapping("/mileageContacts")
    public ArrayList<User> mileageContacts() {
        ArrayList<User> users = GetUserInfoService.getContactMileage();
        return users;
    }

    // 운영 관리자 정보 가져오기
    @GetMapping("/mileEasyContacts")
    public ArrayList<User> mileEasyContacts() {
        ArrayList<User> users = GetUserInfoService.getContactMileEasy();
        return users;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, Object> loginInfo) {
        // ResponseEntity는 HTTP 응답의 상태코드, 헤더, 본문을 모두 제어할 수 있는 스프링의 클래스
        // @RequestBody User user는 클라이언트로부터 JSON 형식의 데이터를 받아서 User 객체로 변환한다.
        // 클라이언트에서 전송된 데이터가 User 객체의 필드와 매핑된다.
        String user_no = (String) loginInfo.get("user_no");
        String user_pw = (String) loginInfo.get("user_pw");
        boolean is_checked = (boolean) loginInfo.get("is_checked");

        User checkedUser = GetUserInfoService.checkedUser(user_no, user_pw);
        // 서비스 계층의 checkedUser 메서드를 호출하여 로그인 정보를 인증한다.
        // 메서드 결과 일치하는 사용자가 있으면 User 객체를 반환. 없으면 null을 반환.

        if (checkedUser != null) {

            if(is_checked && checkedUser.isUser_is_admin()){ // 관리자 로그인 && 운영관리자일 때
                Map<String, Object> response = new HashMap<>();
                response.put("user", checkedUser);
                response.put("user_is_admin", true);
                response.put("is_checked", true);
                return ResponseEntity.ok(response);
            }

            if(is_checked && checkedUser.isUser_is_manager()){ // 관리자 로그인 && 마일리지 담당자일 때
                Map<String, Object> response = new HashMap<>();
                response.put("user", checkedUser);
                response.put("user_is_manager", true);
                response.put("is_checked", true);
                return ResponseEntity.ok(response);
            }

            if(is_checked){ // 관리자 로그인 시
                if(checkedUser.isUser_is_admin() == false && checkedUser.isUser_is_manager() == false){ // 일반 사용자일 때
                    return ResponseEntity.status(403).body("관리자 권한이 없습니다.");
                }
            }

            Map<String, Object> response = new HashMap<>();
            loginHistoryService.loginHistory(user_no);
            response.put("user", checkedUser);
            response.put("user_is_admin", checkedUser.isUser_is_admin());
            response.put("user_is_manager", checkedUser.isUser_is_manager());

            return ResponseEntity.ok(response);
            // HTTP 상태코드 200(ok)와 함께 checkedUser 객체를 응답 본문으로 반환한다.
        } else {
            return ResponseEntity.status(401).body("유효하지 않은 로그인 정보");
            // HTTP 상태코드 401(Unauthorized)과 함께 메시지를 응답 본문으로 반환한다.
        }
    }

    @PostMapping("/pwreset")
    public ResponseEntity<?> resetPassword(@RequestBody User user){
        boolean result = GetUserInfoService.resetPassword(user.getUser_no(), user.getUser_email());
        if(result){
            return ResponseEntity.ok().body("{\"success\":true}");
        }else{
            return ResponseEntity.status(400).body("{\"success\":false, \"message\":\"Invalid email\"}");
        }
    }
    @PostMapping("/loginHistory/{user_no}")
    public void loginHistory(@PathVariable String user_no){
        loginHistoryService.loginHistory(user_no);
    }

    @PostMapping("/loginHistoryCountArray")
    public ArrayList<LoginHistory> loginHistoryCountArray(
            @RequestParam("startDate") String startDate,
            @RequestParam("endDate") String endDate) {

        String start = String.valueOf(startDate);
        String end = String.valueOf(endDate);


        return loginHistoryService.loginHistoryCountArray(start, end);


    }
    @PostMapping("/levelChartData")
    public ArrayList<User> levelChartData(@RequestBody Map<String, String> requestBody) {
        String date = requestBody.get("date");

        return mileService.levelChartData(date);
    }

    @PostMapping("/requestAdd")
    public void requestAdd(@RequestBody Map<String, Object> requestBody) {
        String max = (String) requestBody.get("request_mil_max");
        String milMaxValue = "0";
        try {
            if (max != null && !max.trim().isEmpty()) {
                milMaxValue = max.trim();
            }
        } catch (NumberFormatException e) {
            // NaN이나 형식 오류가 발생하면 milMaxValue는 0으로 유지됩니다.
        }



        String is_branch = (String) requestBody.get("request_is_branch");
        String mile_name = (String) requestBody.get("request_mile_name");


        String mil_max =  milMaxValue;
        String admin = (String) requestBody.get("request_admin");
        String etc = (String) requestBody.get("request_etc");

        // String을 int로 변환
        int request_no = Integer.parseInt((String) requestBody.get("request_no"));
        int mile_no = Integer.parseInt((String) requestBody.get("mile_no"));

        String user_no = (String) requestBody.get("user_no");

        admin = admin.replace("[", "");
        admin = admin.replace("]", "");
        admin = admin.replace("\"", "");
        requestService.insertRequestMileage(is_branch,mile_name,mil_max,admin,etc,request_no,user_no,mile_no);
    }


    @PostMapping("/requestList")
    public ArrayList<Mileage_request> requestList(@RequestParam("user_no") String user_no) {
        // userNo를 사용하여 필요한 데이터 처리
        return requestService.requestList(user_no);
    }

    @PostMapping("/requestListDelete")
    public void  requestListDelete(@RequestParam("mileage_request_no") String mileage_request_no) {
        // userNo를 사용하여 필요한 데이터 처리

        requestService.requestListDelete(mileage_request_no);
    }

    @PostMapping("/changePassword")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> requestBody) {
        String password = requestBody.get("password");
        String user_no = requestBody.get("user_no");
        List<String> result = requestService.changePassword(password,user_no);

        return ResponseEntity.ok().body("{\"success\":" + result.get(0).equals("성공") + ", \"message\":\"" + result.get(1) + "\"}");

    }

    @GetMapping("/chatList")
    public ArrayList<Chat> chatList(){

        return chatService.chatList();
    }

    @PostMapping("/badgeList")
    public ArrayList<MonthlyKing> badgeList() {

        return monthlyKingService.badgeList();

    }

    @GetMapping("/getAllUsers")
    public ArrayList<User> getAllUsers(){

        return getUserInfoService.getAllUsers();
    }

    @PostMapping("/sendSms")
    public ResponseEntity<?> sendSms(@RequestBody SmsRequest request) {
        try {

            smsService.sendSms(request.getTo(), request.getText(), request.getMile());
            return ResponseEntity.ok().body("{\"success\":true}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"success\":false, \"message\":\"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/sendSmsAction")
    public ResponseEntity<?> sendSmsAction(@RequestBody SmsRequest request) {
        try {
            // 요청으로 받은 수신자 목록 및 메시지 텍스트들
            List<String> recipients = request.getTo();
            List<String> messages = request.getTexts();

            // 수신자와 메시지의 수가 일치하는지 확인
            if (recipients.size() != messages.size()) {
                return ResponseEntity.badRequest().body("{\"success\":false, \"message\":\"수신자 목록과 메시지 목록의 크기가 일치하지 않습니다.\"}");
            }

            // SMS 서비스 호출: 각 수신자에게 맞춤형 메시지를 발송
            for (int i = 0; i < recipients.size(); i++) {
                String recipient = recipients.get(i);
                String messageText = messages.get(i);
                smsService.sendSmsAction(recipient, messageText, request.getMile());
            }

            // 성공적인 처리 후 응답 반환
            return ResponseEntity.ok().body("{\"success\":true}");
        } catch (Exception e) {
            // 오류 발생 시 예외 처리 및 500 응답 반환
            return ResponseEntity.status(500).body("{\"success\":false, \"message\":\"" + e.getMessage() + "\"}");
        }
    }



}
