// src/store/modules/position.js
import api from '@/api/axios';

const state = {
  contacts : [],
};

const mutations = {
  setContacts(state, payload) {
    state.contacts = payload;
  },
};

const actions = {
  async arrayContactMileage({commit}){
    try{
      const response = await api.get(`/user/mileageContacts`);
      commit('setContacts', response.data);
    }catch(error){
      console.error('마일리지 담당자 리스트 가져오기 오류', error);
    }
  },
  async arrayContactMileEasy({commit}){
    try{
      const response = await api.get(`/user/mileEasyContacts`);
      commit('setContacts', response.data);
    }catch(error){
      console.error('운영 관리자 리스트 가져오기 오류', error);
    }
  },
};

const getters = {
  getContacts: (state) => state.contacts,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
