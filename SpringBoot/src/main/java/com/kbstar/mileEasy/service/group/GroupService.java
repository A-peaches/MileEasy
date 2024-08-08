package com.kbstar.mileEasy.service.group;

import com.kbstar.mileEasy.mapper.GroupDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroupService {

    @Autowired
    private GroupDao groupDao;

    public List<Map<String, Object>> getUserMileages(String date) {
        // 현재 활성화된 마일리지 정보를 가져옵니다.
        List<Map<String, Object>> activeMileages = groupDao.getActiveMileages();

        // Mapper에 전달할 파라미터를 구성합니다.
        Map<String, Object> params = new HashMap<>();
        params.put("date", date);
        params.put("mileages", activeMileages);

        // 동적으로 마일리지 합계를 계산합니다.
        return groupDao.getUserMileages(date, activeMileages);
    }

}
