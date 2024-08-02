// src/store/modules/mileRecommand.js
import api from '@/api/axios';

const state = {
  mileRecommandInfo: null,
  addComments: []
};

const mutations = {
  setMileRecommandInfo(state, payload) {
    state.mileRecommandInfo = payload;
  },
  setAddComments(state, payload){
    state.addComments = payload;
  }
};

const actions = {
  async getMileRecommand({commit}, mile_no){
    try{
      const response = await api.get(`/mana/mileRecommand/${mile_no}`)
      
      commit ('setMileRecommandInfo', response.data);
    }catch(error){
      console.error('Error fetching mile recommand info:', error);
    }
  },
  async addRecommands(context, recommand){
    try{
      // recommand: {
      //  mile_no: loginInfo 안의 mile_no,
      //  mile_mention: mile_mention,
      //  mile_link: null,
      //  mile_recommand_no: null
      //}
      const response = await api.post(`/mana/addRecommand`, recommand)
      return response;
    }catch(error){
      console.error('Error add mile recommand:', error);
      throw error;
    }
  },
  async updateRecommands(context, recommand){
    try{
      const response = await api.post(`/mana/updateRecommand`, recommand)
      return response;
    }catch(error){
      console.error('Error update mile recommand:', error);
      throw error;
    }
  },
  async deleteRecommands(context, recommand){
    try{
      const mile_recommand_no = recommand.mile_recommand_no;
      const response = await api.get(`/mana/deleteRecommand/${mile_recommand_no}`)
      return response;
    }catch(error){
      console.error('Error delete mile recommand:', error);
      throw error;
    }
  }
};

const getters = {
  getMileRecommandInfo: (state) => state.mileRecommandInfo,
  getAddComments: (state) => state.addComments
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
