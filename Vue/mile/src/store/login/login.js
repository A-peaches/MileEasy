import api from '@/api/axios';

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
      const response = await api.post('/user/login', loginInfo); // await는 비동기 작업이 완료될 때까지 기다린다.
      const data = response.data; // 서버 응답의 본문 데이터를 추출하여 'data' 변수에 저장한다.
      commit('setIsChecked', loginInfo.is_checked);
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
    return new Promise((resolve) => {
      // 페이드 아웃 애니메이션 시작
      document.body.classList.add('fade-out');
      
      // 애니메이션 완료 후 로그아웃 처리
      setTimeout(() => {
        localStorage.removeItem('loginInfo');
        commit('clearLoginInfo');
        
        // 페이드 아웃 클래스 제거
        document.body.classList.remove('fade-out');
        resolve();
      }, 300); // 애니메이션 시간에 맞춰 조절
    });
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
  async sendEmail(context, inputInfo) { // 비밀번호 변경 시 이메일 발송하는 액션 
    try {
      const response = await api.post('/user/pwreset', inputInfo);
      return response.data; // 성공 시 서버 응답 데이터 반환
    } catch (error) {
      console.error('메일 전송 중 오류 발생', error);
      return null;
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
