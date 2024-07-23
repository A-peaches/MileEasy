import axios from 'axios';

const state = {
  objectAttendance: null,
  arrayAttendance: []
};

const mutations = {
  setObjectAttendance(state, payload) {
    state.objectAttendance = payload;
  },
  setArrayAttendance(state, payload) {
    state.arrayAttendance = payload;
  },
};

const actions = {
  async getAttendance({ commit }, user_no) {
    const response = await axios.get(`http://localhost:8090/attendance/getAttendance/${user_no}`);
    const attendanceData = response.data;
    console.log("출석정보 :",attendanceData);
    commit('setArrayAttendance', attendanceData);
  },
  async addAttendance({ dispatch },  user_no ) {
    await axios.get(`http://localhost:8090/attendance/addAttendance/${user_no}`);
     // 출석 추가 후 최신 출석 데이터를 다시 가져옴
     await dispatch('getAttendance', user_no);
  },
};

const getters = {
  getObjectAttendance: (state) => state.objectAttendance,
  getArrayAttendance: (state) => state.arrayAttendance,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
