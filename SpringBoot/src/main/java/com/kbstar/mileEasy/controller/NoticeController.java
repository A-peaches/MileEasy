package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.mapper.NoticeDao;
import com.kbstar.mileEasy.service.notice.NoticeService;
import com.kbstar.mileEasy.service.user.favorite.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;
}
