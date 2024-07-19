// src/store/modules/favorite.js
import axios from 'axios';

const state = {
  objectFavorite: null,
  arrayFavorite : []
};

const mutations = {
  setObjectFavorite(state, payload) {
    state.objectFavorite = payload;
  },
  setArrayFavorite(state, payload) {
    state.arrayFavorite = payload;
  },
};

const actions = {
  async getFavorite({ commit }, user_no) {
    try {
      const response = await axios.get(`http://localhost:8090/favorite/getFavorite/${user_no}`);
      commit('setArrayFavorite', response.data);
    } catch (error) {
      console.error('Error getting Favorite data:', error);
    }
  },
  async changeFavorite({ commit }, { user_no, favorites }) {
    try {
      //즐겨찾기 변경 요청
      const response = await axios.post(`http://localhost:8090/favorite/changeFavorite/${user_no}`, favorites );
      commit('setArrayFavorite', response.data); //업데이트 된 정보 반환.
    } catch (error) {
      console.error('Error getting Favorite data:', error);
    }
  },
};

const getters = {
  getObjectFavorite: (state) => state.objectFavorite,
  getArrayFavorite: (state) => state.arrayFavorite,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
