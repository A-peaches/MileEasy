// src/store/modules/loginHistory.js
import axios from 'axios';

const state = {
  objectLoginHistory: null,
  loginHistory: null,
  loginHistoryCountArray: null,
};

const mutations = {
  setObjectLoginHistory(state, payload) {
    state.objectLoginHistory = payload;
  },
  setLoginHistory(state, payload) {
    state.loginHistory = payload;
  },
  setLoginHistoryCountArray(state, payload) {
    state.loginHistoryCountArray = payload;
  },
};

const actions = {
  async loginHistory({ commit }, user_no) {
    try {
      const response = await axios.get(
        `http://localhost:8090/user/loginHistory/${user_no}`
      );
      commit('setLoginHistory', response.data);
    } catch (error) {
      console.error('loginHistory:', error);
    }
  },

  async loginHistoryCountArray({ commit }, start, end) {
    try {
      console.log('Requesting data with:', { start, end });
      const response = await axios.get(
        'http://localhost:8090/user/loginHistoryCountArray',
        {
          params: { start, end },
        }
      );
      commit('setLoginHistoryCountArray', response.data);
      console.log('Response data:', response.data);
    } catch (error) {
      // 상세한 오류 출력
      console.error(
        'loginHistoryCountArray error:',
        error.response ? error.response.data : error.message
      );
    }
  },
};

const getters = {
  getObjectLoginHistory: (state) => state.objectLoginHistory,
  getLoginHistory: (state) => state.loginHistory,
  getLoginHistoryCountArray: (state) => state.loginHistoryCountArray,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
