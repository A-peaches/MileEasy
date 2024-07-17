// src/store/modules/favorite.js
// import axios from 'axios';

const state = {
  objectFavorite: null,
};

const mutations = {
  setObjectFavorite(state, payload) {
    state.objectFavorite = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectFavorite: (state) => state.objectFavorite,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
