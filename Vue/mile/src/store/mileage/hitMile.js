// src/store/modules/hitMile.js
// import axios from 'axios';

const state = {
  objectHitMile: null,
};

const mutations = {
  setObjectHitMile(state, payload) {
    state.objectHitMile = payload;
  },
};

const actions = {
  
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
