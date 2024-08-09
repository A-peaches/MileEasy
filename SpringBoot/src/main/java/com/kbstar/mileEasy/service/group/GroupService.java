package com.kbstar.mileEasy.service.group;

import com.kbstar.mileEasy.dto.GroupWeight;
import com.kbstar.mileEasy.mapper.GroupDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class GroupService {

    @Autowired
    private GroupDao groupDao;


    public List<Map<String, Object>> getUserMileages(String date, int group_no) {
        List<Map<String, Object>> activeMileages = groupDao.getActiveMileages();


        List<Map<String, Object>> result = groupDao.getUserMileages(date, activeMileages, group_no);
        return result;
    }

    public List<GroupWeight> getWeight(int groupNo) {
        return groupDao.getWeight(groupNo);
    }
}
