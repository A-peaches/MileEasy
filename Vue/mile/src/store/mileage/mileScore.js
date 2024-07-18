// src/store/modules/mileScore.js
import axios from 'axios';

const state = {
  objectMileScore: null,
  arrayMileScore: []
};

const mutations = {
  setObjectMileScore(state, payload) {
    state.objectMileScore = payload;
  },
  setArrayMileScore(state, payload) {
    state.arrayMileScore = payload;
  },
};

const actions = {

  async getMileScore({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/mileage/getMileScore/${user_no}`);
      commit('setArrayMileScore', response.data);
      console.log('뀨',response.data);
    } catch (error) {
      console.error('Error getting mileScore data:', error);
    }
  },
};

const getters = {
  getObjectMileScore: (state) => state.objectMileScore,
  getArrayMileScore: (state) => state.arrayMileScore,
};



export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
