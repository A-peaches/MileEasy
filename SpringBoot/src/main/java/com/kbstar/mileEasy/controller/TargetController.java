package com.kbstar.mileEasy.controller;


import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.service.target.TargetService;
import org.apache.poi.ss.formula.functions.T;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    public ResponseEntity<Map<String, Object>> joinTarget(@RequestBody Map<String, Object> requestBody) {
        try {
            System.out.println("join 메소드 도착 !");
            System.out.println("Received Request Body: " + requestBody);

            if (!requestBody.containsKey("targetNo") || !requestBody.containsKey("userNo")) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "필수 파라미터가 누락되었습니다."));
            }

            // `targetNo`를 숫자로 변환
            int targetNo;
            try {
                targetNo = Integer.parseInt(String.valueOf(requestBody.get("targetNo")));
            } catch (NumberFormatException e) {
                return ResponseEntity.badRequest().body(Map.of("success", false, "message", "targetNo가 유효한 숫자가 아닙니다."));
            }

            String userNo = (String) requestBody.get("userNo");

            targetService.joinTarget(targetNo, userNo);

            return ResponseEntity.ok(Map.of("success", true, "message", "참여가 완료되었습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("success", false, "message", "참여에 실패했습니다."));
        }
    }


    //참여형 참가한 직원 목록
    @GetMapping("/users/{targetNo}")
    public List<Map<String, Object>> getUsersByTargetNo(@PathVariable int targetNo) {
        return targetService.getUsersByTargetNo(targetNo);
    }

    //개인형 삭제하기
    @DeleteMapping("/deleteTarget")
    public String deleteTarget(@RequestParam("user_no") String userNo, @RequestParam("target_no") int targetNo) {
        boolean isDeleted = targetService.deleteTarget(userNo, targetNo);
        if (isDeleted) {
            return "Target successfully deleted.";
        } else {
            return "Failed to delete target.";
        }
    }

    // 마왕 점수 업그레이드
    @PostMapping("/increaseMawangScore")
    public ResponseEntity<String> increaseMawangScore(@RequestBody Map<String, Object> requestBody) {
        try {
            // 요청 본문에서 user_no 및 target_no를 가져옴
            String userNo = (String) requestBody.get("user_no");
            int targetNo = (int) requestBody.get("target_no");

            System.out.println("마왕 점수 업그레이드: " + userNo + ", Target No: " + targetNo);

            // 마왕 점수 업그레이드 로직 처리
            int updatedRows = targetService.increaseMawangScore(userNo, targetNo);

            if (updatedRows > 0) {
                return ResponseEntity.ok("Mawang score updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No records updated");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating mawang score");
        }
    }


    // 특정 목표에 참가한 사용자들의 목록, 달성률, 마일리지 점수 반환
    @GetMapping("/participants/{targetNo}")
    public ResponseEntity<List<Map<String, Object>>> getParticipantsByTargetNo(
            @PathVariable int targetNo,
            @RequestParam int mileNo  // mile_no 파라미터 추가
    ) {
        List<Map<String, Object>> participants = targetService.getParticipantsByTargetNo(targetNo, mileNo);

        System.out.println("participants"+participants);

        // 각 참가자의 마왕 점수를 순회하며 출력
        for (Map<String, Object> participant : participants) {
            System.out.println("User: " + participant.get("user_name") + ", 마왕 점수: " + participant.get("mawang_score"));
        }
        // 미달성한 사람들의 전화번호를 배열로 저장
        List<String> notAchievedPhones = participants.stream()
                .filter(participant -> participant.get("mawang_score") != null && (int) participant.get("mawang_score") == 0)
                .map(participant -> (String) participant.get("user_tel"))
                .collect(Collectors.toList());

        // 참가자 정보에 미달성한 사람들의 전화번호 배열을 추가
        Map<String, Object> response = new HashMap<>();
        response.put("participants", participants);
        response.put("notAchievedPhones", notAchievedPhones);

        System.out.println("미달성 전화번호 배열: " + notAchievedPhones);

        return ResponseEntity.ok(Collections.singletonList(response));
    }

//    // 관리자에 해당하는 프로모션 참가자 데이터 조회
//    @GetMapping("/participantsData")
//    public ResponseEntity<List<Map<String, Object>>> getPromotionParticipantsData(@RequestParam("user_no") String userNo) {
//        List<Map<String, Object>> participantsData = targetService.getPromotionParticipantsData(userNo);
//        return ResponseEntity.ok(participantsData);
//    }

}
