// src/store/modules/mileExcel.js
import axios from 'axios';

const state = {
  objectMileExcel: null,
  arrayMileExcel: [],
  arrayMileDocument: [],
  document_sum: 0
};

const mutations = {
  setObjectMileExcel(state, payload) {
    state.objectMileExcel = payload;
  },
  setArrayMileExcel(state, payload) {
    state.arrayMileExcel = payload;
  },
  setArrayMileDocument(state, payload) {
    state.arrayMileDocument = payload;
  },
  setDocumentSum(state, payload) {
    state.documentSum = payload;
  }
};

const actions = {
  async fetchMileExcelInfo({ commit }, selectedDate) {
    try{
      const response = await axios.get(`http://localhost:8090/mileage/mileExcelFiles`, {params: {date: selectedDate}});
      commit('setArrayMileExcel', response.data);
    }catch(error){
      console.error('Error fetching mile Excel info:', error);
    }
  },
  async downloadFile(context, {mile_excel_file}){
    try{
      const response = await axios.get(`http://localhost:8090/mileage/downloadExcelFile/${encodeURIComponent(mile_excel_file)}`,{
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
  async downloadDocument(context, {document_file}){
    try{
      console.log("문서 첨부파일 이름은: ",document_file);
      const response = await axios.get(`http://localhost:8090/mileage/downloadDocument/${encodeURIComponent(document_file)}`,{
        responseType: 'blob' // 바이너리 데이터를 받는다. 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', document_file);
      document.body.appendChild(link);
      link.click();
    }catch(error){
      console.error('파일 다운로드 실패', error);
    }
  },
  async downloadExcelSample(){
    try{
      const response = await axios.get(`http://localhost:8090/mileage/downloadSample`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'mileage_score_sample.xlsx');
      document.body.appendChild(link);
      link.click();
    }catch(error){
      console.error('파일 다운로드 실패', error);
    }
  },
  async mileExcelLists({ commit }, mile_no){
    try{
      const response = await axios.get(`http://localhost:8090/mileage/totalMileExcel/${mile_no}`)
      commit('setArrayMileExcel', response.data);
    }catch(error){
      console.error('Error get mile excel lists:', error);
    }
  },
  async mileDocumentLists({ commit }, mile_no){
    try{
      const response = await axios.get(`http://localhost:8090/mileage/totalMileDocument/${mile_no}`)
      commit('setArrayMileDocument', response.data);
    }catch(error){
      console.error('Error get mile document lists:', error);
    }
  },
 async deleteMileExcel(context, deleteArray){
  try{
      const response = await axios.post(`http://localhost:8090/mileage/deleteExcel`, deleteArray);
      return response;
    }catch(error){
      console.error('Error delete mile:', error);
      throw error;
    }
  },
  async deleteMileDocument(context, deleteArray){
    try{
      const response = await axios.post(`http://localhost:8090/mileage/deleteDocument`, deleteArray);
      return response;
    }catch(error){
      console.error('Error delete mile document:', error);
      throw error;
    }
  },
  async getMileDocumentSum({commit}, mile_no){
    try{
      const response = await axios.get(`http://localhost:8090/mileage/getDocumentSum/${mile_no}`)
      commit('setDocumentSum', response.data);
    }catch(error){
      console.error('Error get document sum:', error);
    }
  }
};

const getters = {
  getObjectMileExcel: (state) => state.objectMileExcel,
  getArrayMileExcel: (state) => state.arrayMileExcel,
  getArrayMileDocument: (state) => state.arrayMileDocument,
  getDocumentSum: (state) => state.documentSum,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
