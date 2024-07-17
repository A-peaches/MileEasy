// src/store/modules/mtipLike.js
// import axios from 'axios';

const state = {
  objectMtipLike: null,
};

const mutations = {
  setObjectMtipLike(state, payload) {
    state.objectMtipLike = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMtipLike: (state) => state.objectMtipLike,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
