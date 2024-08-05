package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.MtipGuide;
import com.kbstar.mileEasy.dto.Notice;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.ArrayList;


public interface MtipGuideDao {

    @Insert("INSERT INTO mtip_guide (user_no, user_name, mtip_guide_title, mtip_guide_content, mtip_guide_file) " +
            "VALUES (#{user_no}, #{user_name}, #{mtip_guide_title}, #{mtip_guide_content}, #{mtip_guide_file, jdbcType=VARCHAR})")
    @Options(useGeneratedKeys = true, keyProperty = "mtip_guide_no")
    void insertMtipGuide(MtipGuide mtipGuide);

    ArrayList<MtipGuide> mTipGuideList();
    /* m-tip가이드 작성 */


    @Select("SELECT n.mtip_guide_no, n.user_no, n.user_name, n.mtip_guide_title, n.mtip_guide_content, n.mtip_guide_file, n.mtip_guide_date, n.mtip_guide_hit " +
            "FROM mtip_guide n " +
            "WHERE n.mtip_guide_no = #{mtipGuideNo} AND n.mtip_guide_is_delete = 0")
    MtipGuide findById(Long mtipGuideNo);



    @Update("UPDATE mtip_guide SET mtip_guide_hit = mtip_guide_hit + 1 WHERE mtip_guide_no = #{mtipGuideNo}")
    void incrementViews(int mtipGuideNo);

    @Update("UPDATE mtip_guide SET mtip_guide_is_delete = 1 WHERE mtip_guide_no = #{mtipGuideNo}")
    void deleteNotice(Long mtipGuideNo);


    @Update({
            "UPDATE mtip_guide",
            "SET mtip_guide_title = #{mtip_guide_title},",
            "    mtip_guide_content = #{mtip_guide_content},",
            "    mtip_guide_file = #{mtip_guide_file, jdbcType=VARCHAR}",
            "WHERE mtip_guide_no = #{mtip_guide_no}"
    })
    void updateGuide(MtipGuide mtipGuide);
}
