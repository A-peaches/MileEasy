package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.dto.Target;
import com.kbstar.mileEasy.dto.Usertarget;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;


@Mapper
public interface TargetDao {

    @Options(useGeneratedKeys = true, keyProperty = "targetNo")
    void insertTarget(Target target);

    void insertUserTarget(Usertarget usertarget);

    
}
