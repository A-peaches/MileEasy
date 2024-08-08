package com.kbstar.mileEasy.service.target;

import com.fasterxml.jackson.annotation.JacksonAnnotationsInside;
import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.dto.Usertarget;
import com.kbstar.mileEasy.mapper.TargetDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TargetService {

    @Autowired
    private TargetDao targetDao;

    @Autowired
    public TargetService(TargetDao targetDao) {
        this.targetDao = targetDao;
    }

    @Transactional //트랜잭션 내에서 하나의 작업이 실패하면, 트랜잭션 내의 모든 작업이 롤백(취소)
    public void addTarget(Target target) {
        // 1. Target 테이블에 삽입
        targetDao.insertTarget(target);

        // 2. UserTarget 테이블에 삽입
        Usertarget userTarget = new Usertarget();
        userTarget.setUserNo(target.getUserNo());
        userTarget.setTargetNo(target.getTargetNo()); // Insert 이후 생성된 targetNo 사용
        userTarget.setMileNo(target.getMileNo());
        userTarget.setStartDate(target.getStartDate());
        userTarget.setEndDate(target.getEndDate());
        userTarget.setTargetMileage(target.getTargetMileage());
        userTarget.setTogether(target.isTogether());

        targetDao.insertUserTarget(userTarget);
    }
}
