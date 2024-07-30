import axios from 'axios';

const state = {
  objectMileScore: null,
  arrayMileScore: [],
  mileAges: null,
  milePosition : null,
  mileJob : null,
  myMile : null,
  mileStatus : null
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
  setMileJob(state, payload) {
    state.mileJob = payload;
  },
  setMyMile(state, payload) {
    state.myMile = payload;
  },
  setMileStatus(state, payload) {
    state.mileStatus = payload;
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
    } catch (error) {
      console.error('Error getting MilePosition data:', error);
    }
  },
  async getMileJob({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/mileage/getMileJob/${user_no}`);
      commit('setMileJob', response.data);
    } catch (error) {
      console.error('Error getting MileJob data:', error);
    }
  },
  async getMyMiles({ commit },user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/myMile/getMyMiles/${user_no}`);
      commit('setMyMile', response.data);
    } catch (error) {
      console.error('Error getting MileJob data:', error);
    }
  },
  async getMyMileStatus({ commit },{ user_no,mile_no }) {
    try {
      const response = await axios.get(`http://localhost:8090/myMile/getMileStatus/${user_no}/${mile_no}`);
      commit('setMileStatus', response.data);
    } catch (error) {
      console.error('Error getting MileJob data:', error);
    }
  }
};

const getters = {
  getObjectMileScore: (state) => state.objectMileScore,
  getArrayMileScore: (state) => state.arrayMileScore,
  getMileAges: (state) => state.mileAges,
  getMilePositions: (state) => state.milePosition,
  getMileJobs: (state) => state.mileJob,
  getMyMile: (state) => state.myMile,
  getMileStatus: (state) => state.mileStatus,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
