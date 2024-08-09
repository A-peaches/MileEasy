package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.service.TestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/user")
public class TestController {
    private final TestService testService;

    public TestController(TestService testService) {
        this.testService = testService;
    }

    @GetMapping("/name")
    ResponseEntity<?> getHelloWorld(@RequestParam(required = false) String name){
        return new ResponseEntity<>(testService.myName(name), HttpStatus.OK);
    }

    @PostMapping("/age/{age}")
    ResponseEntity<?> postHelloWorld(@PathVariable("age") Integer age){
        return new ResponseEntity<>(testService.myAge(age),HttpStatus.OK);
    }

    @PutMapping("/name")
    ResponseEntity<?> putHelloWorld(){
        return new ResponseEntity<>("Hello World By Put Method",HttpStatus.OK);
    }

    @DeleteMapping("/name")
    ResponseEntity<?> deleteHelloWorld(){
        return new ResponseEntity<>("Hello World By Delete Method",HttpStatus.OK);
    }
}