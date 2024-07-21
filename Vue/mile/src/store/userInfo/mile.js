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
  },
  async addMile(context, mileInfo){
    try{
      const response = await axios.post(`http://localhost:8090/manager/mileAdd`, mileInfo,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    }catch(error){
      console.error('Error add mile:', error);
      throw error;
    }
  },
  async downloadFile(context, {mile_route}){
    try{
      const response = await axios.get(`http://localhost:8090/manager/downloadFile/${mile_route}`,{
        responseType: 'blob' // 바이너리 데이터를 받는다. 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', mile_route);
      document.body.appendChild(link);
      link.click();
    }catch(error){
      console.error('파일 다운로드 실패', error);
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
