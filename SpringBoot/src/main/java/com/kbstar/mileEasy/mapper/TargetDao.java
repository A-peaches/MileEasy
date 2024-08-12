package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.dto.Usertarget;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

import java.util.List;


@Mapper
public interface TargetDao {
    //개인형 목표 추가하기 - Target 테이블
    @Options(useGeneratedKeys = true, keyProperty = "target_no")
    void insertTarget(Target target);
    //개인형 목표 추가하기 - UserTarget 테이블
    void insertUserTarget(Usertarget usertarget);
    //개인형 목표 정보 불러오기
    List<Target> getTargetsByUserNo(String userNo);
    // 참여형 목표 정보 불러오기 (userNo 기반)
    List<Target> getAdminTargets(String userNo);

}
