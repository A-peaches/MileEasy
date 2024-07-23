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
      const response = await axios.post('http://localhost:8090/user/login', loginInfo); // await는 비동기 작업이 완료될 때까지 기다린다.
      const data = response.data; // 서버 응답의 본문 데이터를 추출하여 'data' 변수에 저장한다.
      // reponse.data.user{
      //  user_no: 직원번호
      //  user_email: 직원 이메일
      //  user_pw: 비밀번호
      //  user_name: 이름
      //  user_profile: 직원 프로필 사진 파일 이름
      //  user_year: 입사년도
      //  user_birth: 생년월일
      //  user_is_delete: 직원 삭제 여부
      //  user_is_manager: 직원 마일리지 담당자 여부 (1~8번)
      //  user_is_admin: 직원 운영 관리자 여부 (0 or 1)
      //  dp_no: 소속 부서 이름
      //  level_no: 직급레벨(ex. L1)
      //  job_no: 직무명(ex. 개인)
      //  position_no: 직급명(ex. 대리)
      //  mile_no: 직원 마일리지 담당자인 경우, 마일리지 번호 
      //}
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
  async sendEmail(context, inputInfo) { // 비밀번호 변경 시 이메일 발송하는 액션 
    console.log('Input Info to send:', inputInfo);
    try {
      const response = await axios.post('http://localhost:8090/user/pwreset', inputInfo);
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
