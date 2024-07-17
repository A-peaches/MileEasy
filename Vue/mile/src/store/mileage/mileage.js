// src/store/modules/mileage.js
// import axios from 'axios';

const state = {
  objectMileage: null,
};

const mutations = {
  setObjectMileage(state, payload) {
    state.objectMileage = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMileage: (state) => state.objectMileage,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
