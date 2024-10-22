import api from '@/api/axios';

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
    const response = await api.get(`/attendance/getAttendance/${user_no}`);
    const attendanceData = response.data;
    commit('setArrayAttendance', attendanceData);
  },
  async addAttendance({ dispatch }, user_no) {
    try {
      await api.get(`/attendance/addAttendance/${user_no}`);
      await dispatch('getAttendance', user_no);
    } catch (error) {
      console.error("출석 추가 실패:", error);
      throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있게 함
    }
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