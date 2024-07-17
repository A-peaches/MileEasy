package com.kbstar.mileEasy.service.notice;

import com.kbstar.mileEasy.mapper.MtipDao;
import com.kbstar.mileEasy.mapper.NoticeDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NoticeService {

    @Autowired
    private NoticeDao noticeDao;


}
