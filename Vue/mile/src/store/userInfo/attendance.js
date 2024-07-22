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
  addAttendance(state, payload) {
    state.arrayAttendance.push(payload);
  }
};

const actions = {
  async getAttendance({ commit }, user_no) {
    const response = await axios.get(`http://localhost:8090/attendance/getAttendance/${user_no}`);
    const attendanceData = response.data;
    commit('setArrayAttendance', attendanceData);
  },
  async addAttendance({ commit }, { user_no, attendance }) {
    const response = await axios.post(`http://localhost:8090/attendance/addAttendance`, { user_no, ...attendance });
    commit('addAttendance', response.data);
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
