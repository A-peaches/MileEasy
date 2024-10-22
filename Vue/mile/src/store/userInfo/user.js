
import api from '@/api/axios';

const state = {
  // 필드 선언하는 장소
  arrayUsers: [],
  objectUser: null,
};

const mutations = {
  //setter 선언하는 장소

  setArrayUsers(state, payload) {
    state.arrayUsers = payload;
  },
  setObjectUser(state, payload) {
    state.objectUser = payload;
  },
};

const actions = {
  async getUserById({ commit }, user_no) { // 특정 사용자 데이터를 가져오는 액션 추가
    try {
      const response = await api.get(`/user/${user_no}`);
      commit('setObjectUser', response.data);
    } catch (error) {
      console.error('Error get user data:', error);
    }
  },

  // 뷰페이지 AllUserView -> this.$store.dispatch('user/getAllUser'); -> getAllUser
  async getAllUser({ commit }) {
    // 모든 사용자 데이터를 가져오는 액션 추가
    try {
      const response = await api.get('/user/allUser');
      // 스트링부트 user/allUser서버 이동 -> 스프링부트 데이터 전달 -> const response 담기

      commit('setArrayUsers', response.data);
      // 넘어온 response.data를 담아서 setArrayUsers 실행 ↑↑↑↑↑↑ ①
      // commit :  호출(콜백) 문법!
    } catch (error) {
      console.error('Error get All user data:', error);
    }
  },
};

const getters = {
  //게터 선언하는 장소
  getArrayUsers: (state) => state.arrayUsers,
  getObjectUser: (state) => state.objectUser,
};

//index.js로 내보낼 정보들
export default {
  namespaced: true, //쓸거라서 true
  state,
  mutations,
  actions,
  getters,
};
