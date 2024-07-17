// src/store/modules/mileExcel.js
// import axios from 'axios';

const state = {
  objectMileExcel: null,
  arrayMileExcel: [],
};

const mutations = {
  setObjectMileExcel(state, payload) {
    state.objectMileExcel = payload;
  },
  setArrayMileExcel(state, payload) {
    state.arrayMileExcel = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMileExcel: (state) => state.objectMileExcel,
  getArrayMileExcel: (state) => state.ArrayMileExcel,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
