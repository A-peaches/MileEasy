package com.kbstar.mileEasy.service.mtip;

import com.kbstar.mileEasy.dto.MtipReply;
import com.kbstar.mileEasy.mapper.MtipDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MtipReplyService {

    @Autowired
    private MtipDao mtipDao;

    public void addComment(MtipReply mtipReply) {
        mtipDao.insertComment(mtipReply);
    }

    public List<MtipReply> getComments(int mtipBoardNo) {
        return mtipDao.selectCommentsByBoardNo(mtipBoardNo);
    }
    public void updateComment(MtipReply mtipReply) {
        mtipDao.updateComment(mtipReply);
    }

    public void deleteComment(int mtipReplyNo) {
        mtipDao.deleteComment(mtipReplyNo);
    }

}
