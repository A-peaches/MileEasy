// src/store/modules/mile.js
import axios from 'axios';

const state = {
  mileInfo: null,
  mileDetail: null,
  arrayMiles: []
};

const mutations = {
  setMileInfo(state, mileInfo) {
    state.mileInfo = mileInfo;
  },
  setMileDetail(state, mileDetail){
    state.mileDetail = mileDetail;
  },
  setArrayMiles(state, payload){
    state.arrayMiles = payload;
  }
};

const actions = {
  async fetchMileInfo({commit}, user_no){
    try{
      const response = await axios.get(`http://localhost:8090/manager/mileIntro/${user_no}`);
      commit('setMileInfo', response.data);
    }catch(error){
      console.error('Error fetching mile info:', error);
    }
  },
  async getMileDetail({commit}, mile_no){
    try{
      const response = await axios.get(`http://localhost:8090/manager/mileDetail/${mile_no}`)
      commit('setArrayMiles', response.data);
    }catch(error){
      console.error('Error get mile detail:', error);
    }
  }
  
};

const getters = {
  getMileInfo: (state) => state.mileInfo,
  getMileDetail: (state) => state.mileDetail,
  getArrayMiles: (state) => state.arrayMiles
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
