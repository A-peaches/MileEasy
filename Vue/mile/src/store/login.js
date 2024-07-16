import axios from 'axios';

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
  async login({ commit }, loginInfo) {
    try{
      const response = await axios.post('http://localhost:8090/user/login', loginInfo);
      const data = response.data;

      if(response.status === 200){ // 서버에서 성공 여부를 반환하는 것으로 가정
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1시간 후 만료
        const storageData = {
          loginInfo: data,
          expirationTime: expirationTime
        };
        localStorage.setItem('loginInfo', JSON.stringify(storageData));
        commit('setLoginInfo', data.user);
        
        return true; // 로그인 성공
      }else{
        // 로그인 실패 처리
        console.error('Login 실패', data.message);
        return false; //로그인 실패 
      }
    }catch(error){
      console.error('error 발생', error);
      return false; // 에러 발생 시 로그인 실패 
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
