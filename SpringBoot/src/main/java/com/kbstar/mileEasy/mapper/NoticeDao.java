package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.Notice;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface NoticeDao {

    @Insert("INSERT INTO notice (user_no, user_name, notice_board_title, notice_board_content, notice_board_file, mile_no) " +
            "VALUES (#{user_no}, #{user_name}, #{notice_board_title}, #{notice_board_content}, #{notice_board_file, jdbcType=VARCHAR}, #{mile_no, jdbcType=INTEGER})")
    @Options(useGeneratedKeys = true, keyProperty = "notice_board_no")
    void insertNotice(Notice notice);
    /* 게시글 글작성 */

    @Select("SELECT n.notice_board_no, n.user_no, n.user_name, n.notice_board_title, n.notice_board_content, n.notice_board_file, n.notice_board_date, n.notice_board_hit,n.mile_no, m.mile_name " +
            "FROM notice n " +
            "LEFT JOIN mileage m ON n.mile_no = m.mile_no " +
            "WHERE n.notice_board_is_delete = 0")
    List<Notice> selectAllNotices();
    /* 게시글 리스트 */


    @Select("select mile_no,mile_name from mileage WHERE mile_is_delete = 0")
    List<Mileage> selectAllMileage();
    /* 카테고리 리스트 */

    @Update("UPDATE notice SET notice_board_hit = notice_board_hit + 1 WHERE notice_board_no = #{noticeId}")
    void incrementViews(int noticeId);
    /* 게시글 조회 수 */

    @Select("SELECT n.notice_board_no, n.user_no, n.user_name, n.notice_board_title, n.notice_board_content, n.notice_board_file, n.notice_board_date, n.notice_board_hit,  n.mile_no, m.mile_name " +
            "FROM notice n " +
            "lEFT JOIN mileage m ON n.mile_no = m.mile_no " +
            "WHERE n.notice_board_no = #{noticeId}")
    Notice getNoticeDetails(int noticeId);
    /* 게시글 상세보기 */


    List<Notice> getFooterNotice();


    @Update({
            "UPDATE notice",
            "SET notice_board_title = #{notice_board_title},",
            "    notice_board_content = #{notice_board_content},",
            "    notice_board_file = #{notice_board_file, jdbcType=VARCHAR},",
            "    mile_no = (SELECT mile_no FROM mileage WHERE mile_name = #{mile_name})",
            "WHERE notice_board_no = #{notice_board_no}"
    })
    void updateNotice(Notice notice);
    /* 게시글 수정*/

    @Select("SELECT mile_no FROM mileage WHERE mile_name = #{mileName} AND mile_is_delete = 0")
    int findMileNoByName(String mileName);

    @Select("SELECT n.notice_board_no, n.user_no, n.user_name, n.notice_board_title, n.notice_board_content, n.notice_board_file, n.notice_board_date, n.notice_board_hit, n.mile_no, m.mile_name " +
            "FROM notice n " +
            "LEFT JOIN mileage m ON n.mile_no = m.mile_no " +
            "WHERE n.notice_board_no = #{id} AND n.notice_board_is_delete = 0")
    Notice findById(Long id);

    @Update("UPDATE notice SET notice_board_is_delete = 1 WHERE notice_board_no = #{id}")
    void deleteNotice(Long id);




}



