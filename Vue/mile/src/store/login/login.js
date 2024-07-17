import axios from 'axios';

const state = {
  loginInfo: null,
  isChecked: null,
};

const mutations = {
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  clearLoginInfo(state) {
    state.loginInfo = null;
    state.isChecked = null; // isChecked도 초기화
  },
  setIsChecked(state, isChecked) {
    state.isChecked = isChecked;
  },
};

const actions = {
  async login({ commit }, loginInfo) {
    try {
      const response = await axios.post(
        'http://localhost:8090/user/login',
        loginInfo
      );
      const data = response.data;
      commit('setIsChecked', loginInfo.is_checked); // isChecked를 Vuex store에 저장
      if (response.status === 200) {
        const expirationTime = new Date().getTime() + 60 * 60 * 1000;
        const storageData = {
          loginInfo: data.user,
          isChecked: loginInfo.is_checked, // isChecked도 저장
          expirationTime: expirationTime,
        };
        localStorage.setItem('loginInfo', JSON.stringify(storageData));
        commit('setLoginInfo', data.user);
        return data;
      } else {
        console.error('Login 실패', data.message);
        return null;
      }
    } catch (error) {
      console.error('error 발생', error);
      return null;
    }
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
        commit('setIsChecked', data.isChecked); // isChecked도 로드
      } else {
        localStorage.removeItem('loginInfo');
        commit('clearLoginInfo');
      }
    }
  },
};

const getters = {
  getLoginInfo: (state) => state.loginInfo,
  getIsChecked: (state) => state.isChecked,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
