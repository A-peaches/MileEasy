import axios from 'axios';

const state = {
  kingBadge: null,
  jumpBadge: null,
};

const mutations = {
  setKingBadge(state, imageUrl) {
    state.kingBadge = imageUrl;
  },
  setJumpBadge(state, payload) {
    state.jumpBadge = payload;
  },
};

const actions = {
  async badgeKingImage({ commit }) {
    try {
      const response = await axios.get(
        `http://localhost:8090/admin/badgeKingImage`,
        { responseType: 'blob' }
      );
      const imageUrl = URL.createObjectURL(response.data);
      commit('setKingBadge', imageUrl);
    } catch (error) {
      console.error(`Error fetching badge:`, error);
    }
  },

  async badgeJumpImage({ commit }) {
    try {
      const response = await axios.get(
        `http://localhost:8090/admin/badgeJumpImage`,
        { responseType: 'blob' }
      );
      const imageUrl = URL.createObjectURL(response.data);
      commit('setJumpBadge', imageUrl);
    } catch (error) {
      console.error(`Error fetching badge:`, error);
    }
  },
};

const getters = {
  getKingBadge: (state) => state.kingBadge,
  getJumpBadge: (state) => state.jumpBadge,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
