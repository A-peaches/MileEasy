package com.kbstar.mileEasy.service.target;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.dto.Usertarget;
import com.kbstar.mileEasy.mapper.TargetDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TargetService {

    @Autowired
    private TargetDao targetDao;

    //개인형 목표 등록하기
    @Autowired
    public TargetService(TargetDao targetDao) {
        this.targetDao = targetDao;
    }

    @Transactional //트랜잭션 내에서 하나의 작업이 실패하면, 트랜잭션 내의 모든 작업이 롤백(취소)
    public void addTarget(Target target) {
        System.out.print("addTarget 도착 !  ");
        System.out.print("target :"+ target);
        // 1. Target 테이블에 삽입
        targetDao.insertTarget(target);

        // 2. UserTarget 테이블에 삽입
        Usertarget userTarget = new Usertarget();
        userTarget.setUser_no(target.getUser_no());
        userTarget.setTarget_no(target.getTarget_no()); // Insert 이후 생성된 targetNo 사용
        userTarget.setMile_no(target.getMile_no());
        userTarget.setStart_date(target.getStart_date());
        userTarget.setEnd_date(target.getEnd_date());
        userTarget.setTarget_mileage(target.getTarget_mileage());
        userTarget.set_together(target.is_together());

        targetDao.insertUserTarget(userTarget);
    }

    //개인형 목표 불러오기
    public List<Target> getTargetByUserNo(String userNo){
        System.out.println("getTargetByUserNo 도착 ! ");
        System.out.println("userNo:" + userNo);  // userNo 출력
        return targetDao.getTargetsByUserNo(userNo);
    }

    // 참여형 목표 정보 불러오기 (userNo 기반)
    public List<Target> getAdminTargets(String userNo) {
        System.out.println("getAdminTargets 메소드 도착!");
        return targetDao.getAdminTargets(userNo);
    }

    // 사용자가 특정 타겟에 참여했는지 확인
    public boolean isUserParticipating(int targetNo, String userNo) {
        return targetDao.checkUserParticipation(targetNo, userNo) > 0;
    }

    // 사용자  참여하기
    public void joinTarget(int targetNo, String userNo) {

        System.out.println("joinTarget service 도착 ! ");
        // 목표 정보를 가져오기
        Target target = targetDao.getTargetByNo(targetNo);

        // 사용자 목표에 참여시키기
        Usertarget userTarget = new Usertarget();
        userTarget.setTarget_no(target.getTarget_no());
        userTarget.setUser_no(userNo);
        userTarget.setMile_no(target.getMile_no());
        userTarget.setStart_date(target.getStart_date());
        userTarget.setEnd_date(target.getEnd_date());
        userTarget.setTarget_mileage(target.getTarget_mileage());
        userTarget.set_together(target.is_together());
        System.out.println("userTarget dao 들렸다가 옴 : "+userTarget);
        // user_target 테이블에 삽입
        targetDao.joinUserTarget(userTarget);
    }



}
