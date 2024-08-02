// src/store/modules/level.js
// import api from '@/api/axios';

const state = {
  objectLevel: null,
};

const mutations = {
  setObjectLevel(state, payload) {
    state.objectLevel = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectLevel: (state) => state.objectLevel,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
