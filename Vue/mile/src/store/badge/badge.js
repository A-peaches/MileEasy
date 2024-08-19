import api from '@/api/axios';

const state = {
  kingBadge: null,
  jumpBadge: null,
};

const mutations = {
  setKingBadge(state, imageUrl) {
    state.kingBadge = imageUrl;
  },
  setJumpBadge(state, payload) {
    state.jumpBadge = payload;
  },
};

const actions = {
  async badgeKingImage({ commit }) {
    try {
      const response = await api.get(`/admin/badgeKingImage`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);

      commit('setKingBadge', imageUrl);
    } catch (error) {
      console.error(`Error fetching badge:`, error);
    }
  },

  async badgeJumpImage({ commit }) {
    try {
      const response = await api.get(`/admin/badgeJumpImage`, {
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      commit('setJumpBadge', imageUrl);
    } catch (error) {
      console.error(`Error fetching badge:`, error);
    }
  },
  async watchBadgeChanges({ dispatch }) {
    setInterval(() => {
      dispatch('badgeKingImage');
      dispatch('badgeJumpImage');
    }); // 5초마다 확인 (필요에 따라 조정 가능)
  },
};

const getters = {
  getKingBadge: (state) => state.kingBadge,
  getJumpBadge: (state) => state.jumpBadge,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
