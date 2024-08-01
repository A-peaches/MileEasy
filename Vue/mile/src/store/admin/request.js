import axios from 'axios';

const state = {
  requestList: null,
};

const mutations = {
  setRequestList(state, payload) {
    state.requestList = payload;
  },
};

const actions = {
  async requestList({ commit }) {
    try {
      const response = await axios.get(
        `http://localhost:8090/admin/requestList`
      );
      console.log(response.data);
      commit('setRequestList', response.data);
    } catch (error) {
      console.error(`Error fetching badge:`, error);
    }
  },
};

const getters = {
  getRequestList: (state) => state.requestList,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
