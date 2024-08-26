import api from '@/api/axios';

const state = {
  objectHitMile: null,
  hitMileChart: null,
};

const mutations = {
  setObjectHitMile(state, payload) {
    state.objectHitMile = payload;
  },
  setHitMileChart(state, payload) {
    state.hitMileChart = payload;
  },
};

const actions = {
  async hit_mile({ commit }, mile_no) {
    try {
      const response = await api.get(
        `/mileage/hit_mile/${mile_no}`
      );
      commit('setObjectHitMile', response.data);
    } catch (error) {
      console.error('hit_mile:', error);
    }
  },
  async hit_mileChart({ commit }) {
    try {
      const response = await api.get(
        `/mileage/hit_mileChart`
      );
      commit('setHitMileChart', response.data); // 수정: setHitMileChart 사용
    } catch (error) {
      console.error('hit_mile:', error);
    }
  },
};

const getters = {
  getObjectHitMile: (state) => state.objectHitMile,
  getHitMileChart: (state) => state.hitMileChart, // 수정: hitMileChart 사용
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
