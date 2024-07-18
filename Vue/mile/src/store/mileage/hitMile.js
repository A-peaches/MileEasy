import axios from 'axios';

const state = {
  objectHitMile: null,
};

const mutations = {
  setObjectHitMile(state, payload) {
    state.objectHitMile = payload;
  },
};

const actions = {
  async hit_mile({ commit }, mile_no) {
    try {
      const response = await axios.get(
        `http://localhost:8090/mileage/hit_mile/${mile_no}`
      );
      commit('setObjectHitMile', response.data);
    } catch (error) {
      console.error('hit_mile:', error);
    }
  },
};

const getters = {
  getObjectHitMile: (state) => state.objectHitMile,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
