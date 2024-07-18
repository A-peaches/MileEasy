// src/store/modules/favorite.js
import axios from 'axios';

const state = {
  objectFavorite: null,
  arrayFavorite : []
};

const mutations = {
  setObjectFavorite(state, payload) {
    state.objectFavorite = payload;
  },
  setArrayFavorite(state, payload) {
    state.arrayFavorite = payload;
  },
};

const actions = {
  async getFavorite({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/favorite/getFavorite/${user_no}`);
      commit('setArrayFavorite', response.data);
    } catch (error) {
      console.error('Error getting Favorite data:', error);
    }
  },
};

const getters = {
  getObjectFavorite: (state) => state.objectFavorite,
  getArrayFavorite: (state) => state.arrayFavorite,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
