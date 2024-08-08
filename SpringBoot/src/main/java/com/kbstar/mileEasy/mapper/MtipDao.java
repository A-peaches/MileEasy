package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.*;
import org.apache.ibatis.annotations.*;

import java.util.List;


@Mapper
public interface MtipDao {


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
    /* m-tip 게시글 리스트 */

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
    @Options(useGeneratedKeys = true, keyProperty = "mtip_board_no", keyColumn = "mtip_board_no")
    void insertMtip(MtipBoard notice);
    /* 게시글 글작성 */

    @Select("SELECT m.mtip_board_no, m.user_no, m.user_name, m.mtip_board_title, m.mtip_board_content, m.mtip_board_file, m.mtip_board_date, m.mtip_board_hit, m.mile_no, mil.mile_name, m.mtip_board_like " +
            "FROM mtip_board m " +
            "LEFT JOIN mileage mil ON m.mile_no = mil.mile_no " +
            "WHERE m.mtip_board_no = #{id} AND m.mtip_board_is_delete = 0")
    MtipBoard findById(Long id);

    @Update("UPDATE mtip_board SET mtip_board_is_delete = 1 WHERE mtip_board_no = #{id}")
    void deleteNotice(Long id);
    /*mtip 삭제*/

    @Update({
            "UPDATE mtip_board",
            "SET mtip_board_title = #{mtip_board_title},",
            "    mtip_board_content = #{mtip_board_content},",
            "    mtip_board_file = #{mtip_board_file, jdbcType=VARCHAR},",
            "    mile_no = (SELECT mile_no FROM mileage WHERE mile_name = #{mile_name})",
            "WHERE mtip_board_no = #{mtip_board_no}"
    })
    void updateNotice(MtipBoard notice);
    /* mtip 수정*/

    @Select("SELECT mb.mtip_board_no, mb.user_no, mb.user_name, mb.mtip_board_title, " +
            "mb.mtip_board_content, mb.mtip_board_file, mb.mtip_board_date, " +
            "mb.mtip_board_like, mb.mtip_board_hit, mb.mtip_board_is_delete, " +
            "m.mile_name " +
            "FROM mtip_board mb " +
            "LEFT JOIN mileage m ON mb.mile_no = m.mile_no " +
            "WHERE mb.mtip_board_is_delete = 0 " +
            "AND mb.user_no = #{user_no}")
    List<MtipBoard> selectMymtiplist(@Param("user_no") String user_no);
    /* m-tip 게시글 리스트 */

    @Select("SELECT DISTINCT mb.mtip_board_no, mb.user_no, mb.user_name, mb.mtip_board_title, " +
            "mb.mtip_board_content, mb.mtip_board_file, mb.mtip_board_date, " +
            "mb.mtip_board_like, mb.mtip_board_hit, mb.mtip_board_is_delete, " +
            "m.mile_name " +
            "FROM mtip_board mb " +
            "LEFT JOIN mileage m ON mb.mile_no = m.mile_no " +
            "LEFT JOIN mtip_like ml ON mb.mtip_board_no = ml.mtip_board_no " +
            "WHERE mb.mtip_board_is_delete = 0 " +
            "AND ml.user_no = #{user_no} " +
            "LIMIT 0, 1000")
    List<MtipBoard> selectMyBestmtiplist(@Param("user_no") String user_no);
    /* 로그인한 사용자가 좋아요한 m-tip 게시글 리스트 */

    @Select("SELECT mb.mtip_board_no, mb.user_no, mb.user_name, mb.mtip_board_title, " +
            "mb.mtip_board_content, mb.mtip_board_file, mb.mtip_board_date, " +
            "mb.mtip_board_like, mb.mtip_board_hit, mb.mtip_board_is_delete, " +
            "m.mile_name " +
            "FROM mtip_board mb " +
            "LEFT JOIN mileage m ON mb.mile_no = m.mile_no " +
            "WHERE mb.mtip_board_is_delete = 0 " +
            "ORDER BY mb.mtip_board_like DESC " +
            "LIMIT 9")
    List<MtipBoard> selectTopLikedMtiplist();
    /* 좋아요가 많은 상위 9개의 m-tip 게시글 리스트 */

    @Select("SELECT mb.mtip_board_no, mb.user_no, mb.user_name, mb.mtip_board_title, " +
            "mb.mtip_board_content, mb.mtip_board_file, mb.mtip_board_date, " +
            "mb.mtip_board_like, mb.mtip_board_hit, mb.mtip_board_is_delete, " +
            "m.mile_name " +
            "FROM mtip_board mb " +
            "LEFT JOIN mileage m ON mb.mile_no = m.mile_no " +
            "WHERE mb.mtip_board_is_delete = 0 " +
            "ORDER BY mb.mtip_board_like DESC " +
            "LIMIT 10")
    List<MtipBoard> selectTopLikedMtiplistPlus();
    /* 좋아요가 많은 상위 9개의 m-tip 게시글 리스트 */

    @Insert("INSERT INTO mtip_reply (user_no, user_name, mtip_board_no, mtip_reply_content, mtip_reply_date) " +
            "VALUES (#{user_no}, #{user_name}, #{mtip_board_no}, #{mtip_reply_content}, NOW())")
    void insertComment(MtipReply mtipReply);
    /*mtip 댓글 등록*/

    @Select("SELECT * FROM mtip_reply WHERE mtip_board_no = #{mtipBoardNo} ORDER BY mtip_reply_date DESC")
    List<MtipReply> selectCommentsByBoardNo(@Param("mtipBoardNo") int mtipBoardNo);
    /*mtip 댓글 조회*/

    @Update("UPDATE mtip_reply SET mtip_reply_content = #{mtip_reply_content}, mtip_reply_date = NOW() WHERE mtip_reply_no = #{mtip_reply_no}")
    void updateComment(MtipReply mtipReply);
    /*mtip 댓글 수정*/
    @Delete("DELETE FROM mtip_reply WHERE mtip_reply_no = #{mtipReplyNo}")
    void deleteComment(@Param("mtipReplyNo") int mtipReplyNo);
    /*mtip 댓글 삭제*/
}
