package com.kbstar.mileEasy.service.qna;

import com.kbstar.mileEasy.mapper.QnADao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerService {

    @Autowired
    private QnADao qnADao;


}
