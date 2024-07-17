package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.service.admin.AdminService;
import com.kbstar.mileEasy.service.qna.AnswerService;
import com.kbstar.mileEasy.service.qna.QnAService;
import com.kbstar.mileEasy.service.qna.QuesetionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/qna")
public class QnAController {

    @Autowired
    private QnAService qnAService;
    @Autowired
    private QuesetionService quesetionService;
    @Autowired
    private AnswerService answerService;

}
