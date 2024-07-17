package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.service.user.info.GetUserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/user") // 'http://localhost:8090/user/allUser'  /user 부분!
public class UserController {

    @Autowired
    private GetUserInfoService GetUserInfoService;
    @Autowired
    private GetUserInfoService getUserInfoService;

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
        User checkedUser = getUserInfoService.checkedUser(user.getUser_no(), user.getUser_pw());
        System.out.println(checkedUser);
        if(checkedUser != null) {
            return ResponseEntity.ok(checkedUser);
        }else{
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }
}
