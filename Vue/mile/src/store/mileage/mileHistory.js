
const state = {
  objectMileHistory: null,
  arrayMileHistory: [],
};

const mutations = {
  setObjectMileHistory(state, payload) {
    state.objectMileHistory = payload;
  },
  setArrayMileHistory(state, payload) {
    state.arrayMileHistory = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectMileHistory: (state) => state.objectMileHistory,
  getArrayMileHistory: (state) => state.ArrayMileHistory,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
