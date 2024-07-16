package com.kbstar.mileEasy.controller;

import com.kbstar.mileEasy.service.admin.AdminService;
import com.kbstar.mileEasy.service.mtip.MtipBoardService;
import com.kbstar.mileEasy.service.mtip.MtipLikeService;
import com.kbstar.mileEasy.service.mtip.MtipReplyService;
import com.kbstar.mileEasy.service.mtip.MtipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/mtip")
public class MtipController {

    @Autowired
    private MtipService mtipService;
    @Autowired
    private MtipBoardService mtipBoardService;
    @Autowired
    private MtipLikeService mtipLikeService;
    @Autowired
    private MtipReplyService mtipReplyService;

}
