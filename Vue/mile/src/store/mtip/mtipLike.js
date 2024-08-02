// src/store/modules/mtipLike.js
// import api from '@/api/axios';

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
