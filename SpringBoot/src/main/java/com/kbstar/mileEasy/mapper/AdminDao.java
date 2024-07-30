package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.ArrayList;


@Mapper
public interface AdminDao {

    ArrayList<User> getileageAdminList(String mileNo);
}
