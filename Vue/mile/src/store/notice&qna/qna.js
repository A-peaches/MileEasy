// src/store/modules/qna.js
// import axios from 'axios';

const state = {
  arrayQnA: [],
  objectQnA: null,
};

const mutations = {

  setArrayQnA(state, payload) {
    state.arrayQnA = payload;
  },
  setObjectQnA(state, payload) {
    state.objectQnA = payload;
  },
};

const actions = {
 
};

const getters = {
  //게터 선언하는 장소
  getArrayQnA: (state) => state.arrayQnA,
  getObjectQnA: (state) => state.objectQnA,
};

//index.js로 내보낼 정보들
export default {
  namespaced: true, //쓸거라서 true
  state,
  mutations,
  actions,
  getters,
};
