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

// 최초 로그인 후 30분 뒤 자동로그아웃.
const actions = {
  login({ commit }, loginInfo) {
    // 로그인 로직 (예: API 호출)
    const expirationTime = new Date().getTime() + 60 * 30 * 1000; // 30분 후 만료
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
        // 로그인 정보 만료
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
