package com.kbstar.mileEasy.mapper;
import com.kbstar.mileEasy.beans.BadgeData;
import com.kbstar.mileEasy.beans.ExcelNotice;
import com.kbstar.mileEasy.beans.MileStatus;
import com.kbstar.mileEasy.beans.MyMiles;
import com.kbstar.mileEasy.dto.DocumentMile;
import org.apache.ibatis.annotations.Mapper;

import javax.swing.text.Document;
import java.util.List;


@Mapper
public interface MyMileDao {

    List<MyMiles> getMyMiles(String userNo);

    List<MileStatus>  getMileStatus(String userNo, int mileNo);


    List<ExcelNotice> getExcelNotice();

    List<DocumentMile> selectMileDocument();
    int selectCount();

    List<BadgeData> loadBadgeData(String userNo);
}
