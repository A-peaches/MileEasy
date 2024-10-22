// src/store/modules/loginHistory.js
import api from '@/api/axios';

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
      const response = await api.get(
        `/user/loginHistory/${user_no}`
      );
      commit('setLoginHistory', response.data);
    } catch (error) {
      console.error('loginHistory:', error);
    }
  },

  async loginHistoryCountArray({ commit }, start, end) {
    try {
      const response = await api.get(
        '/user/loginHistoryCountArray',
        {
          params: { start, end },
        }
      );
      commit('setLoginHistoryCountArray', response.data);
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
