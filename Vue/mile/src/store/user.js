// src/store/modules/user.js
import axios from 'axios';

const state = {
  arrayUsers: [],
  objectUser: null
};

const mutations = {
  setArrayUsers(state, payload) {
    state.arrayUsers = payload;
  },
  setObjectUser(state, payload) {
    state.objectUser = payload;
  }
};

const actions = {
  async getUserById({ commit }, user_no) { // 특정 사용자 데이터를 가져오는 액션 추가
    try {
      const response = await axios.get(`http://localhost:8090/user/${user_no}`);
      commit('setObjectUser', response.data);
    } catch (error) {
      console.error('Error get user data:', error);
    }
  },
  async getAllUser({ commit }) { // 모든 사용자 데이터를 가져오는 액션 추가
    try {
      const response = await axios.get('http://localhost:8090/user/allUser');
      commit('setArrayUsers', response.data);
    } catch (error) {
      console.error('Error get All user data:', error);
    }
  }
};

const getters = {
  getArrayUsers: state => state.arrayUsers,
  getObjectUser: state => state.objectUser
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
