package com.kbstar.mileEasy.mapper;

import com.kbstar.mileEasy.dto.MtipGuide;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;

import java.util.ArrayList;


public interface MtipGuideDao {

    @Insert("INSERT INTO mtip_guide (user_no, user_name, mtip_guide_title, mtip_guide_content, mtip_guide_file) " +
            "VALUES (#{user_no}, #{user_name}, #{mtip_guide_title}, #{mtip_guide_content}, #{mtip_guide_file, jdbcType=VARCHAR})")
    @Options(useGeneratedKeys = true, keyProperty = "mtip_guide_no")
    void insertMtipGuide(MtipGuide mtipGuide);

    ArrayList<MtipGuide> mTipGuideList();
    /* m-tip가이드 작성 */
}
