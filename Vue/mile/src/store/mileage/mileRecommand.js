// src/store/modules/mileRecommand.js
// import axios from 'axios';

const state = {
  objectMileRecommand: null,
};

const mutations = {
  setObjectMileRecommand(state, payload) {
    state.objectMileRecommand = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMileRecommand: (state) => state.objectMileRecommand,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
