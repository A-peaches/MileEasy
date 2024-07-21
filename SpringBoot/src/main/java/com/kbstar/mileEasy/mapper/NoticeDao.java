package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Notice;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface NoticeDao {

    @Insert("INSERT INTO notice (user_no, user_name, notice_board_tile, notice_board_content, notice_board_file, notice_board_date, notice_board_hit, notice_board_is_delete) " +
            "VALUES (#{user_no}, #{user_name}, #{notice_board_title}, #{notice_board_content}, #{notice_board_file}, NOW(), #{notice_board_hit}, #{notice_board_is_delete})")
    void insertNotice(Notice notice);

    @Select("SELECT * FROM notice_board")
    List<Notice> getAllNotices();

    @Select("SELECT * FROM notice_board WHERE notice_board_no = #{id}")
    Notice getNoticeById(@Param("id") int id);
}
