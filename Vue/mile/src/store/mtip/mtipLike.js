// src/store/modules/mtipLike.js
import api from '@/api/axios';

const state = {
  objectMtipLike: null,
  likedPosts: [],
  notice: null, // 추가: notice 상태 변수
};

const mutations = {
  setObjectMtipLike(state, payload) {
    state.objectMtipLike = payload;
  },
  SET_NOTICE(state, notice) {
    state.notice = notice;
  },
  SET_LIKED_POSTS(state, likedPosts) {
    state.likedPosts = likedPosts;
  },
  UPDATE_LIKE_STATUS(state, { mtipBoardNo, isLiked }) {
    if (state.notice && state.notice.mtip_board_no === mtipBoardNo) {
      state.notice.mtip_board_like += isLiked ? 1 : -1;
    }
  },
  INCREMENT_LIKE_COUNT(state, mtip_board_no) {
    if (state.notice && state.notice.mtip_board_no === mtip_board_no) {
      state.notice.mtip_board_like++;
    }
  },

  DECREMENT_LIKE_COUNT(state, mtip_board_no) {
    if (state.notice && state.notice.mtip_board_no === mtip_board_no) {
      state.notice.mtip_board_like--;
    }
  },
};

const actions = {
  async fetchNoticeDetail({ commit }, mtipBoardNo) {
    try {
      const response = await api.get(`/mtip/details/${mtipBoardNo}`);
      commit('SET_NOTICE', response.data);
    } catch (error) {
      console.error('Error fetching notice detail:', error);
    }
  },
  
  async fetchLikedPosts({ commit }, userId) {
    try {
      const response = await api.get(`/mtip/liked-posts/${userId}`);
      commit('SET_LIKED_POSTS', response.data);
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  },
  
  async checkLikeStatus(_, { mtipBoardNo, userNo }) {
    try {
      const response = await api.get(`/mtip/check-like/${mtipBoardNo}/${userNo}`);
      return response.data.isLiked;
    } catch (error) {
      console.error('Error checking like status:', error);
      return false;
    }
  },
  
  async toggleLike({ commit, dispatch }, { mtip_board_no, user_no }) {
    try {
      const response = await api.post('/mtip/toggle-like', { mtip_board_no, user_no });
      
      if (response.data.isLiked) {
        commit('INCREMENT_LIKE_COUNT', mtip_board_no);
      } else {
        commit('DECREMENT_LIKE_COUNT', mtip_board_no);
      }
      // 좋아요 상태 업데이트
      await dispatch('fetchLikedPosts', user_no);
      
      return response.data;
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }  
};

const getters = {
  getObjectMtipLike: (state) => state.objectMtipLike,
  getNotice: (state) => state.notice,
  isPostLiked: (state) => (mtipBoardNo) => state.likedPosts.includes(mtipBoardNo)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
