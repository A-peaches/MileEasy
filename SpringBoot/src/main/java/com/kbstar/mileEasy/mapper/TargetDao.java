package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.dto.Usertarget;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;

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
    // 사용자가 특정 타겟에 참여했는지 확인
    int checkUserParticipation(@Param("targetNo") int targetNo, @Param("userNo") String userNo);
    // 특정 목표 정보를 가져오기
    Target getTargetByNo(int targetNo);
    // 사용자 목표 참여 정보 추가하기
    void joinUserTarget(Usertarget userTarget);
}
