// src/store/modules/department.js
// import axios from 'axios';

const state = {
  objectDepartment: null,
};

const mutations = {
  setObjectDepartment(state, payload) {
    state.objectDepartment = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectDepartment: (state) => state.objectDepartment,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
