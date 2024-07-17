import axios from 'axios';

const state = {
  loginInfo: null,
  isChecked: false
};

const mutations = {
  setLoginInfo(state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  clearLoginInfo(state) {
    state.loginInfo = null;
  },
  setIsChecked(state, isChecked){
    state.isChecked = isChecked;
  }
};

const actions = { // Vuex 액션을 정의하는 객체. Vuex 액션은 비동기 작업을 수행할 때 사용된다. 
  async login({ commit }, loginInfo) { // 로그인. async는 비동기 함수임을 선언한다.  
    try{
      const response = await axios.post('http://localhost:8090/user/login', loginInfo); // await는 비동기 작업이 완료될 때까지 기다린다. 
      const data = response.data; // 서버 응답의 본문 데이터를 추출하여 'data' 변수에 저장한다. 

      if(response.status === 200){ // 서버의 응답 상태 코드가 200(ok)인지 확인한다. 
        const expirationTime = new Date().getTime() + 60 * 60 * 1000; // 1시간 후 만료
        const storageData = { // 로그인 정보와 만료 시간을 저장한다. 
          loginInfo: data.user,
          isChecked: data.isChecked,
          expirationTime: expirationTime
        };
        localStorage.setItem('loginInfo', JSON.stringify(storageData)); 
        // localStorage에 storageData 객체를 JSON문자열로 변환하여 저장한다. 키 이름은 'loginInfo'이다. 
        commit('setLoginInfo', data.user);
        commit('setIsChecked', data.isChecked);
        // Vuex의 commit 메서드를 사용하여 setLoginInfo 뮤테이션을 호출하고, data.user를 인자로 전달하여 로그인 정보를 상태에 저장한다. 

        return data; // 로그인 성공 시 사용자 데이터를 반환.
      }else{
        // 로그인 실패 처리
        console.error('Login 실패', data.message);
        return null; //로그인 실패 시 null 반환. 
      }
    } catch (error) {
      console.error('error 발생', error);
      return null; // 에러 발생 시 로그인 실패 
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
