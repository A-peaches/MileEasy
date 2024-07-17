// src/store/modules/attendance.js
// import axios from 'axios';

const state = {
  objectAttendance: null,
};

const mutations = {
  setObjectAttendance(state, payload) {
    state.objectAttendance = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectAttendance: (state) => state.objectAttendance,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
