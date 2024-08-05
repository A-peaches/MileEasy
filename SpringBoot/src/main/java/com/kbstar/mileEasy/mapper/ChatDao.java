package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.Chat;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface ChatDao {
    ArrayList<Chat> chatList();
}
