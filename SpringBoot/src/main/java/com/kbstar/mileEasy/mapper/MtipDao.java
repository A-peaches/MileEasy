package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Mileage;
import com.kbstar.mileEasy.dto.MtipBoard;
import com.kbstar.mileEasy.dto.MtipGuide;
import com.kbstar.mileEasy.dto.Notice;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface MtipDao {


    @Select("SELECT mtip_board_no FROM mtip_like WHERE user_no = #{userId}")
    List<Integer> getLikedPostIds(@Param("userId") String userId);

    @Select("SELECT COUNT(*) FROM mtip_like WHERE mtip_board_no = #{mtipBoardNo} AND user_no = #{userNo}")
    int checkLikeStatus(@Param("mtipBoardNo") int mtipBoardNo, @Param("userNo") String userNo);

    @Insert("INSERT INTO mtip_like (mtip_board_no, user_no) VALUES (#{mtipBoardNo}, #{userNo})")
    void insertLike(@Param("mtipBoardNo") int mtipBoardNo, @Param("userNo") String userNo);

    @Delete("DELETE FROM mtip_like WHERE mtip_board_no = #{mtipBoardNo} AND user_no = #{userNo}")
    void deleteLike(@Param("mtipBoardNo") int mtipBoardNo, @Param("userNo") String userNo);

    @Update("UPDATE mtip_board SET mtip_board_like = mtip_board_like + 1 WHERE mtip_board_no = #{mtipBoardNo}")
    void incrementLikeCount(@Param("mtipBoardNo") int mtipBoardNo);

    @Update("UPDATE mtip_board SET mtip_board_like = mtip_board_like - 1 WHERE mtip_board_no = #{mtipBoardNo}")
    void decrementLikeCount(@Param("mtipBoardNo") int mtipBoardNo);
    /*좋아요 코드 */

    @Select("SELECT mb.mtip_board_no, mb.user_no, mb.user_name, mb.mtip_board_title, " +
            "mb.mtip_board_content, mb.mtip_board_file, mb.mtip_board_date, " +
            "mb.mtip_board_like, mb.mtip_board_hit, mb.mtip_board_is_delete, " +
            "m.mile_name " +
            "FROM mtip_board mb " +
            "LEFT JOIN mileage m ON mb.mile_no = m.mile_no " +
            "WHERE mb.mtip_board_is_delete = 0 ")
    List<MtipBoard> selectMtiplist();
    /* m-tip 가이드 리스트 */

    @Select("SELECT mb.mtip_board_no, mb.user_no, mb.user_name, mb.mtip_board_title, " +
            "mb.mtip_board_content, mb.mtip_board_file, mb.mtip_board_date, " +
            "mb.mtip_board_like, mb.mtip_board_hit, mb.mtip_board_is_delete, " +
            "mb.mile_no, m.mile_name " +
            "FROM mtip_board mb " +
            "LEFT JOIN mileage m ON mb.mile_no = m.mile_no " +
            "WHERE mb.mtip_board_no = #{mtipId} AND mb.mtip_board_is_delete = 0")
    MtipBoard getMtipDetails(int mtipId);
    /* m-tip 상세보기 */

    @Update("UPDATE mtip_board SET mtip_board_hit = mtip_board_hit + 1 WHERE mtip_board_no = #{noticeId}")
    int MtipViews(int noticeId);
    /* 게시글 조회 수 */

    @Select("select mile_no,mile_name from mileage WHERE mile_is_delete = 0")
    List<Mileage> selectMtipMileage();
    /* 카테고리 리스트 */

    @Insert("INSERT INTO mtip_board (user_no, user_name, mile_no, mtip_board_title, mtip_board_content, mtip_board_file) " +
            "VALUES (#{user_no}, #{user_name}, #{mile_no}, #{mtip_board_title}, #{mtip_board_content}, #{mtip_board_file, jdbcType=VARCHAR})")
    @Options(useGeneratedKeys = true, keyProperty = "mtip_board_no")
    void insertMtip(MtipBoard notice);
    /* 게시글 글작성 */

    @Select("SELECT m.mtip_board_no, m.user_no, m.user_name, m.mtip_board_title, m.mtip_board_content, m.mtip_board_file, m.mtip_board_date, m.mtip_board_hit, m.mile_no, mil.mile_name, m.mtip_board_like " +
            "FROM mtip_board m " +
            "LEFT JOIN mileage mil ON m.mile_no = mil.mile_no " +
            "WHERE m.mtip_board_no = #{id} AND m.mtip_board_is_delete = 0")
    MtipBoard findById(Long id);

}
