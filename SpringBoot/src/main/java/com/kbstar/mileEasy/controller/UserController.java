package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.LoginHistory;
import com.kbstar.mileEasy.dto.Mileage_request;
import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.mileage.info.MileService;
import com.kbstar.mileEasy.service.user.info.GetUserInfoService;
import com.kbstar.mileEasy.service.user.info.LoginHistoryService;
import com.kbstar.mileEasy.service.user.request.RequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.*;

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


    @GetMapping("/{user_no}")
    public User user_no(@PathVariable String user_no) {
        User user = GetUserInfoService.getUserById(user_no);
        System.out.println(user);
        return user;
    }

    @GetMapping("/allUser")   //'http://localhost:8090/user/allUser'  /allUser 부분!
    public ArrayList<User> allUser() {
        ArrayList<User> users = GetUserInfoService.getAllUser(); //UserService의 getAllUser 실행
        System.out.println(users);
        return users; //호출된 곳으로 다시 돌아감!!!
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
        System.out.println(checkedUser);
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
        System.out.println("들어왔따!");
        System.out.println(mileService.levelChartData(date));
        return mileService.levelChartData(date);
    }

    @PostMapping("/requestAdd")
    public void requestAdd(@RequestBody Map<String, String> requestBody) {
        boolean is_branch = Boolean.parseBoolean(requestBody.get("request_is_branch"));
        String mile_name = requestBody.get("request_mile_name");
        String mil_max = requestBody.get("request_mil_max");
        String admin = requestBody.get("request_admin");
        String etc =  requestBody.get("request_etc");
        int request_no = Integer.parseInt(requestBody.get("request_no"));
        String user_no =  requestBody.get("user_no");
        int mile_no = Integer.parseInt(requestBody.get("mile_no"));

        System.out.println(is_branch);
        System.out.println(mile_name);


        System.out.println(mil_max);
        System.out.println(admin);


        System.out.println(etc);

        System.out.println(request_no);
        System.out.println(user_no);
        System.out.println(mile_no);


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

}
