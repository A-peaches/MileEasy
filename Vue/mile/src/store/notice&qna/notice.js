// src/store/modules/loginHistory.js
// import axios from 'axios';

const state = {
  objectLoginHistory: null,
};

const mutations = {
  setObjectLoginHistory(state, payload) {
    state.objectLoginHistory = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectLoginHistory: (state) => state.objectLoginHistory,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
