// src/store/modules/mileExcel.js
import axios from 'axios';

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
  async fetchMileExcelInfo({ commit }, selectedDate) {
    try{
      const response = await axios.get(`http://localhost:8090/mileage/mileExcelFiles/${selectedDate}`);
      commit('setArrayMileExcel', response.data);
    }catch(error){
      console.error('Error fetching mile Excel info:', error);
    }
  },
  async downloadFile(context, mile_excel_file){
    try{
      const response = await axios.get(`http://localhost:8090/manager/downloadExcelFile/${mile_excel_file}`,{
        responseType: 'blob' // 바이너리 데이터를 받는다. 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', mile_excel_file);
      document.body.appendChild(link);
      link.click();
    }catch(error){
      console.error('파일 다운로드 실패', error);
    }
  },
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
