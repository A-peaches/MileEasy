import axios from 'axios';

const state = {
  objectMileage: null,
  arrayMileage: [],
};

const mutations = {
  setMileInfo(state, mileInfo) {
    state.mileInfo = mileInfo;
  },
  setArrayMileage(state, payload) {
    state.arrayMileage = payload;
  },
};

const actions = {
  // 마일리지 정보를 모두 가져오기
  async getMileage({ commit }) {
    try {
      const response = await axios.get(
        'http://localhost:8090/mileage/getMileage'
      );
      commit('setArrayMileage', response.data);
    } catch (error) {
      console.error('Error getting all mileage data:', error);
    }
  },
};

const getters = {
  getObjectMileage: (state) => state.objectMileage,
  getArrayMileage: (state) => state.arrayMileage,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
