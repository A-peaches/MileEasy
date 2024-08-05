package com.kbstar.mileEasy.service.Chat;
import com.kbstar.mileEasy.beans.PageCount;
import com.kbstar.mileEasy.dto.*;
import com.kbstar.mileEasy.mapper.ChatDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.*;

@Service
public class ChatService {
    @Autowired
    private ChatDao chatDao;

    public ArrayList<Chat> chatList() {
        return chatDao.chatList();
    }
}
