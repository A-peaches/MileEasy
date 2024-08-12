package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.service.target.TargetService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/target")
public class TargetController {

        @Autowired
        TargetService targetService;

        //개인형 목표 추가하기
        @PostMapping("/create")
        public void createTarget(@RequestBody Target target) {
            System.out.println("target created 메소드 도착 ! " + target);
            targetService.addTarget(target);
            System.out.print("target:"+target);
         }
        //개인형 목표 불러오기
        @GetMapping("/user/{userNo}")
        public List<Target> getTarget(@PathVariable String userNo) {
            System.out.print("target getTarget 메소드 도착 ! ");
            return targetService.getTargetByUserNo(userNo);
        }

        // 참여형 목표 불러오기
        @GetMapping("/admin/targets/{userNo}")
        public List<Target> getAdminTargets(@PathVariable String userNo) {
            System.out.println("Admin targets !");
            return targetService.getAdminTargets(userNo);
        }

        // 특정 타겟에 대해 사용자가 참여했는지 여부 확인
        @GetMapping("/checkParticipation/{targetNo}/{userNo}")
        public ResponseEntity<Boolean> checkUserParticipation(@PathVariable int targetNo, @PathVariable String userNo) {
            boolean isParticipating = targetService.isUserParticipating(targetNo, userNo);
            return ResponseEntity.ok(isParticipating);
        }

    //참여형 참여하기 버튼
    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> joinTarget(@RequestBody Map<String, String> requestBody) {
        try {
            System.out.println("join 메소드 도착 !");
            System.out.println("Received Request Body: " + requestBody);

            if (!requestBody.containsKey("targetNo") || !requestBody.containsKey("userNo")) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "필수 파라미터가 누락되었습니다."));
            }

            int targetNo = Integer.parseInt(requestBody.get("targetNo"));
            String userNo = requestBody.get("userNo");

            targetService.joinTarget(targetNo, userNo);

            return ResponseEntity.ok(Map.of("success", true, "message", "참여가 완료되었습니다."));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", "targetNo가 유효한 숫자가 아닙니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "참여에 실패했습니다."));
        }
    }


}
