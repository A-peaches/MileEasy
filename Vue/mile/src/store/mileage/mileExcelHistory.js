// src/store/modules/mileExcelHistory.js
// import axios from 'axios';

const state = {
  objectMileExcelHistory: null,
  arrayMileExcelHistory: [],
};

const mutations = {
  setObjectMileExcelHistory(state, payload) {
    state.objectMileExcelHistory = payload;
  },
  setArrayMileExcelHistory(state, payload) {
    state.arrayMileExcelHistory = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMileExcelHistory: (state) => state.objectMileExcelHistory,
  getArrayMileExcelHistory: (state) => state.ArrayMileExcelHistory,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
