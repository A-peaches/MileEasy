// src/store/modules/mtipBoard.js
// import axios from 'axios';

const state = {
  arrayNotice: [],
  objectNotice: null,
};

const mutations = {

  setArrayNotice(state, payload) {
    state.arrayNotice = payload;
  },
  setObjectNotice(state, payload) {
    state.objectNotice = payload;
  },
};

const actions = {
 
};

const getters = {
  //게터 선언하는 장소
  getArrayNotice: (state) => state.arrayNotice,
  getObjectNotice: (state) => state.objectNotice,
};

//index.js로 내보낼 정보들
export default {
  namespaced: true, //쓸거라서 true
  state,
  mutations,
  actions,
  getters,
};
