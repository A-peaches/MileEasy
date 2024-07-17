// src/store/modules/mtipBoard.js
// import axios from 'axios';

const state = {
  arrayMtipBoard: [],
  objectMtipBoard: null,
};

const mutations = {

  setArrayMtipBoard(state, payload) {
    state.arrayMtipBoard = payload;
  },
  setObjectMtipBoard(state, payload) {
    state.objectMtipBoard = payload;
  },
};

const actions = {
 
};

const getters = {
  //게터 선언하는 장소
  getArrayMtipBoard: (state) => state.arrayMtipBoard,
  getObjectMtipBoard: (state) => state.objectMtipBoard,
};

//index.js로 내보낼 정보들
export default {
  namespaced: true, //쓸거라서 true
  state,
  mutations,
  actions,
  getters,
};
