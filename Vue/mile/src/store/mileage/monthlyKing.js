
const state = {
  arrayMonthlyKing: [],
  objectMonthlyKing: null,
};

const mutations = {

  setArrayMonthlyKing(state, payload) {
    state.arrayMonthlyKing = payload;
  },
  setObjectMonthlyKing(state, payload) {
    state.objectMonthlyKing = payload;
  },
};

const actions = {
 
};

const getters = {
  //게터 선언하는 장소
  getArrayMonthlyKing: (state) => state.arrayMonthlyKing,
  getObjectMonthlyKing: (state) => state.objectMonthlyKing,
};

//index.js로 내보낼 정보들
export default {
  namespaced: true, //쓸거라서 true
  state,
  mutations,
  actions,
  getters,
};
