package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface NoticeDao {

    @Insert("INSERT INTO notice (user_no, user_name, notice_board_title, notice_board_content, notice_board_file, notice_board_date, notice_board_hit, notice_board_is_delete) " +
            "VALUES (#{user_no}, #{user_name}, #{notice_board_title}, #{notice_board_content}, #{notice_board_file}, NOW(), #{notice_board_hit}, #{notice_board_is_delete})")
    void insertNotice(Notice notice);
    /* 게시글 글작성 */

    @Select("SELECT n.notice_board_no, n.user_no, n.user_name, n.notice_board_title, n.notice_board_content, n.notice_board_file, n.notice_board_date, n.notice_board_hit, m.mile_name " +
            "FROM notice n " +
            "JOIN mileage m ON n.mile_no = m.mile_no")
    List<Notice> selectAllNotices();
    /* 게시글 리스트 */

    @Select("select mile_no,mile_name from mileage")
    List<Mileage> selectAllMileage();
    /* 카테고리 리스트 */

    @Update("UPDATE notice SET notice_board_hit = notice_board_hit + 1 WHERE notice_board_no = #{noticeId}")
    void incrementViews(int noticeId);
    /* 게시글 조회 수 */

    @Select("SELECT n.notice_board_no, n.user_no, n.user_name, n.notice_board_title, n.notice_board_content, n.notice_board_file, n.notice_board_date, n.notice_board_hit, m.mile_name " +
            "FROM notice n " +
            "JOIN mileage m ON n.mile_no = m.mile_no " +
            "WHERE n.notice_board_no = #{noticeId}")
    Notice getNoticeDetails(int noticeId);
    /* 게시글 상세보기 */

}
