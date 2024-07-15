// import axios from 'axios';

const state = {
  loginInfo: null,
};

const mutations = {
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  clearLoginInfo(state) {
    state.loginInfo = null;
  }
};

const actions = {
  login({ commit }, loginInfo) {
    const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1시간 후 만료
    const data = {
      loginInfo: loginInfo,
      expirationTime: expirationTime
    };
    localStorage.setItem('loginInfo', JSON.stringify(data));
    commit('setLoginInfo', loginInfo);
  },
  logout({ commit }) {
    localStorage.removeItem('loginInfo');
    commit('clearLoginInfo');
  },
  checkLogin({ commit }) {
    const data = JSON.parse(localStorage.getItem('loginInfo'));
    if (data) {
      const currentTime = new Date().getTime();
      if (currentTime < data.expirationTime) {
        commit('setLoginInfo', data.loginInfo);
      } else {
        localStorage.removeItem('loginInfo');
        commit('clearLoginInfo');
      }
    }
  }
};

const getters = {
  getLoginInfo: state => state.loginInfo
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
