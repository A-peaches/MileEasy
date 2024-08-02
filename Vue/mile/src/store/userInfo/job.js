// src/store/modules/job.js
// import api from '@/api/axios';

const state = {
  objectJob : null,
};

const mutations = {
  setObjectJob(state, payload) {
    state.objectJob = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectJob: (state) => state.objectJob,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
