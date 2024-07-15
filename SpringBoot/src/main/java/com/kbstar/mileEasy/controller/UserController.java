package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.dto.User;
import com.kbstar.mileEasy.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
@RequestMapping("/user") // 'http://localhost:8090/user/allUser'  /user 부분!
public class UserController {

    @Autowired
    private UserService userService;

/*    @GetMapping("/")
    public String home() {
        return "home";
    }*/

    @GetMapping("/{user_no}")
    public User user_no(@PathVariable String user_no) {
        User user = userService.getUserById(user_no);
        System.out.println(user);
        return user;
    }

    @GetMapping("/allUser")   //'http://localhost:8090/user/allUser'  /allUser 부분!
    public ArrayList<User> allUser() {
        ArrayList<User> users = userService.getAllUser(); //UserService의 getAllUser 실행
        System.out.println(users);
        return users; //호출된 곳으로 다시 돌아감!!!
    }
}
