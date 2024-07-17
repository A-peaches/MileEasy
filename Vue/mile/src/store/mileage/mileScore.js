// src/store/modules/mileScore.js
// import axios from 'axios';

const state = {
  objectMileScore: null,
};

const mutations = {
  setObjectMileScore(state, payload) {
    state.objectMileScore = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMileScore: (state) => state.objectMileScore,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
