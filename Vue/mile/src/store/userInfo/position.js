
const state = {
  objectPosition : null,
};

const mutations = {
  setObjectPosition(state, payload) {
    state.objectPosition = payload;
  },
};

const actions = {
  
};

const getters = {
  getObjectPosition: (state) => state.objectPosition,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
