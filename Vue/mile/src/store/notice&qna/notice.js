// src/store/modules/loginHistory.js
// import axios from 'axios';

const state = {
  objectLoginHistory: null,
  loginInfo: {
    user_is_admin: false, // 기본값 설정
  }
};

const mutations = {
  setObjectLoginHistory(state, payload) {
    state.objectLoginHistory = payload;
  },
  SET_USER_IS_ADMIN(state, isAdmin) {
    state.loginInfo.user_is_admin = isAdmin;
  },
};

const actions = {
  setUserIsAdmin({ commit }, isAdmin) {
    commit('SET_USER_IS_ADMIN', isAdmin);
  },
};

const getters = {
  getObjectLoginHistory: (state) => state.objectLoginHistory,
  loginInfo: (state) => state.loginInfo,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
