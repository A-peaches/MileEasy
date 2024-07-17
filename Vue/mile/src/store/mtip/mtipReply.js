// src/store/modules/mtipReply.js
// import axios from 'axios';

const state = {
  objectMtipReply: null,
};

const mutations = {
  setObjectMtipReply(state, payload) {
    state.objectMtipReplye = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMtipReply: (state) => state.objectMtipReply,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
