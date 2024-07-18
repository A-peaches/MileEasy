// src/store/modules/mile.js
import axios from 'axios';

const state = {
  mileInfo: null,
};

const mutations = {
  setMileInfo(state, mileInfo) {
    state.mileInfo = mileInfo;
  },
};

const actions = {
  async fetchMileInfo({commit}, user_no){
    try{
      const response = await axios.get(`http://localhost:8090/mileage/mileIntro/${user_no}`);
      commit('setMileInfo', response.data);
    }catch(error){
      console.error('Error fetching mile info:', error);
    }
  }
  
};

const getters = {
  getMileInfo: (state) => state.mileInfo,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
