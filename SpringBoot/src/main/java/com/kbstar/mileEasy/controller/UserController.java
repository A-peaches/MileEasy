package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.user.info.GetUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user") // 'http://localhost:8090/user/allUser'  /user 부분!
public class UserController {

    @Autowired
    private GetUserInfoService GetUserInfoService;

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
    public ResponseEntity<?> login(@RequestBody User user) {
        // ResponseEntity는 HTTP 응답의 상태코드, 헤더, 본문을 모두 제어할 수 있는 스프링의 클래스
        // @RequestBody User user는 클라이언트로부터 JSON 형식의 데이터를 받아서 User 객체로 변환한다.
        // 클라이언트에서 전송된 데이터가 User 객체의 필드와 매핑된다.

        User checkedUser = GetUserInfoService.checkedUser(user.getUser_no(), user.getUser_pw());
        // 서비스 계층의 checkedUser 메서드를 호출하여 로그인 정보를 인증한다.
        // 메서드 결과 일치하는 사용자가 있으면 User 객체를 반환. 없으면 null을 반환.
        System.out.println(checkedUser);
        if (checkedUser != null) {

            if(user.isUser_is_admin() && checkedUser.isUser_is_admin()){
                Map<String, Object> response = new HashMap<>();
                response.put("user", checkedUser);
                response.put("user_is_admin", checkedUser.isUser_is_admin());
                return ResponseEntity.ok(response);
            }

            if(user.isUser_is_manager() && checkedUser.isUser_is_manager()){
                Map<String, Object> response = new HashMap<>();
                response.put("user", checkedUser);
                response.put("user_is_manager", checkedUser.isUser_is_manager());
                return ResponseEntity.ok(response);
            }

            if(user.isUser_is_admin() || user.isUser_is_manager()){
                if(!checkedUser.isUser_is_admin() && !checkedUser.isUser_is_manager()){
                    return ResponseEntity.status(403).body("관리자 권한이 없습니다.");
                }
            }

            Map<String, Object> response = new HashMap<>();
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
}
