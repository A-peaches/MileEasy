import axios from 'axios';

const state = {
  objectMileScore: null,
  arrayMileScore: [],
  mileAges: null,
  milePosition : null,
};

const mutations = {
  setObjectMileScore(state, payload) {
    state.objectMileScore = payload;
  },
  setArrayMileScore(state, payload) {
    state.arrayMileScore = payload;
  },
  setMileAges(state, payload) {
    state.mileAges = payload;
  },
  setMilePosition(state, payload) {
    state.milePosition = payload;
  },
};

const actions = {
  async getMileScore({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/mileage/getMileScore/${user_no}`);
      commit('setArrayMileScore', response.data);
    } catch (error) {
      console.error('Error getting mileScore data:', error);
    }
  },
  async getMileAge({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/mileage/getMileAge/${user_no}`);
      commit('setMileAges', response.data);
    } catch (error) {
      console.error('Error getting mileAges data:', error);
    }
  },
  async getMilePosition({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/mileage/getMilePosition/${user_no}`);
      commit('setMilePosition', response.data);
      console.log('뀨웅', response.data);
    } catch (error) {
      console.error('Error getting MilePosition data:', error);
    }
  },
};

const getters = {
  getObjectMileScore: (state) => state.objectMileScore,
  getArrayMileScore: (state) => state.arrayMileScore,
  getMileAges: (state) => state.mileAges,
  getMilePositions: (state) => state.milePosition,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
