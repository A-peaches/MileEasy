// src/store/modules/mileHistory.js
import axios from 'axios';

const state = {
    objectMileDocument: null,
    arrayMileDocument: [],
  };
  
  const mutations = {
    setObjectMileDocument(state, payload) {
      state.objectMileDocument = payload;
    },
    setArrayMileDocument(state, payload) {
      state.arrayMileDocument = payload;
    },
  };
  
  const actions = {
    async fetchMileDocument(){
        try{
            const response = await axios.get(`http://localhost:8090/myMile/mileDocument`);
            return response;
        }catch(error){
            console.error('Error get mile document lists:', error);
        }
    }
  };
  
  const getters = {
    getObjectMileDocument: (state) => state.objectMileDocument,
    getMileDocumentList: (state) => state.ArrayMileDocument,
  };
  
  
  export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters,
  };
  