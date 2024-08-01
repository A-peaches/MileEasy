// src/store/index.js
import { createStore } from 'vuex';
import user from './userInfo/user';
import login from './login/login';
import department from './userInfo/department';
import job from './userInfo/job';
import position from './userInfo/position';
import loginHistory from './login/loginHistory';
import attendance from './userInfo/attendance';
import favorite from './mileage/favorite';
import hitMile from './mileage/hitMile';
import mileage from './mileage/mileage';
import mileHistory from './mileage/mileHistory';
import mileScore from './mileage/mileScore';
import mtipBoard from './mtip/mtipBoard';
import mtipLike from './mtip/mtipLike';
import mtipReply from './mtip/mtipReply';
import notice from './notice&qna/notice';
import qna from './notice&qna/qna';
import monthlyKing from './mileage/monthlyKing';
import mileExcel from './mileage/mileExcel';
import mileExcelHistory from './mileage/mileExcelHistory';
import mileRecommand from './mileage/mileRecommand';
import mile from './userInfo/mile';
import badge from './badge/badge';
import mileDocument from './mileage/mileDocument';
import request from './admin/request';

export default createStore({
  modules: {
    user,
    login,
    department,
    job,
    position,
    loginHistory,
    attendance,
    favorite,
    hitMile,
    mileage,
    mileHistory,
    mileScore,
    mtipBoard,
    mtipLike,
    mtipReply,
    notice,
    qna,
    monthlyKing,
    mileExcel,
    mileExcelHistory,
    mileRecommand,
    mile,
    badge,
    mileDocument,
    request,
  },
});
