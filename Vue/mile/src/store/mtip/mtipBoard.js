// src/store/modules/loginHistory.js
import api from '@/api/axios';

const state = {
  objectLoginHistory: null,
  notices: [],
  notice: null,
  footerNotices: [],
  mtipGuideList: [],
  mtipGuideLists: [],
  likedPosts: {},
  isLiked: false, // 새로운 상태 추가
};

const mutations = {
  SET_NOTICES(state, notices) {
    state.notices = notices;
  },
  SET_NOTICE(state, notice) {
    console.log('Setting notice in store:', notice);
    state.notice = notice;
  },
  INCREMENT_VIEWS(state, noticeId) {
    const notice = state.notices.find((n) => n.notice_board_no === noticeId);
    if (notice) {
      notice.notice_board_hit = (notice.notice_board_hit || 0) + 1;
    }
  },
  setFooterNotices(state, payload) {
    state.footerNotices = payload;
  },
  setMtipGuideList(state, mtipGuide) {
    state.mtipGuideList = mtipGuide;
  },
  setMtipGuideLists(state, mtipGuide) {
    state.mtipGuideLists = mtipGuide;
  },
  Guide_INCREMENT_VIEWS(state, mtipGuideNo) {
    const mtipGuide = state.mtipGuideLists.find(
      (n) => n.mtip_guide_no === mtipGuideNo
    );
    if (mtipGuide) {
      mtipGuide.mtip_guide_hit = (mtipGuide.mtip_guide_hit || 0) + 1;
    }
  },
  SET_LIKE_STATUS(state, isLiked) {
    state.isLiked = isLiked;
  },
  SET_LIKED_POSTS(state, { user_no, likedPosts }) {
    state.likedPosts[user_no] = likedPosts;
  },
  TOGGLE_LIKE(state, { user_no, mtip_board_no }) {
    if (!state.likedPosts[user_no]) {
      state.likedPosts[user_no] = [];
    }
    const index = state.likedPosts[user_no].indexOf(mtip_board_no);
    if (index > -1) {
      state.likedPosts[user_no].splice(index, 1);
    } else {
      state.likedPosts[user_no].push(mtip_board_no);
    }
  },
};

const actions = {
  
  async fetchLikedPosts({ commit }, user_no) {
    try {
      const response = await api.get(`/mtip/liked-posts/${user_no}`);
      commit('SET_LIKED_POSTS', { user_no, likedPosts: response.data });
    } catch (error) {
      console.error('Error fetching liked posts:', error);
    }
  },
  async fetchNotices({ commit }) {
    try {
      const response = await api.get('/mtip/Mtiplist');
      commit('SET_NOTICES', response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  },

  // mtipBoard.js 또는 관련 Vuex 모듈
async fetchNoticeDetail({ commit }, noticeId) {
  if (!noticeId) {
    console.error('Notice ID is undefined');
    return;
  }
  try {
    console.log('Fetching notice detail for ID:', noticeId);
    const response = await api.get(`/mtip/${noticeId}`);
    console.log('API Response:', response); // 전체 응답 로깅
    if (response.data) {
      console.log('Fetched notice details:', response.data);
      commit('SET_NOTICE', response.data);
      return response; // 명시적으로 response 반환
    } else {
      console.error('No data in response');
      throw new Error('No data in response');
    }
  } catch (error) {
    console.error(
      'Error fetching notice detail:',
      error.response ? error.response.data : error.message
    );
    throw error; // 에러를 다시 throw하여 컴포넌트에서 캐치할 수 있게 함
  }
},

  async incrementViews({ commit }, noticeId) {
    try {
      await api.post(`/mtip/MtipViews/${noticeId}`);
      commit('INCREMENT_VIEWS', noticeId);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  },

  async addNotice({ commit }, formData) {
    try {
      const response = await api.post('/mtip/write', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        commit('ADD_NOTICE', response.data);
      }
    } catch (error) {
      console.error(
        'Error adding notice:',
        error.response ? error.response.data : error.message
      );
    }
  },

  async getFooterNotice({ commit }) {
    try {
      const response = await api.get('/notice/getFooterNotice');
      commit('setFooterNotices', response.data);
    } catch (error) {
      console.error('Error getting footer Notice data:', error);
    }
  },

  async checkLikeStatus({ commit }, { mtip_board_no, user_no }) {
    try {
      const response = await api.get(`/mtip/check-like/${mtip_board_no}/${user_no}`);
      commit('SET_LIKE_STATUS', response.data.isLiked);
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  },

  async toggleLikeAction({ commit, dispatch }, { mtip_board_no, user_no }) {
    try {
      await api.post('/mtip/toggle-like', { mtip_board_no, user_no });
      commit('TOGGLE_LIKE', { user_no, mtip_board_no });
      dispatch('fetchNoticeDetail', mtip_board_no);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  },

};

const getters = {
  getNotices: (state) => state.notices,
  getNotice(state) {
    return state.notice;
  },
  getFooterNotices(state) {
    return state.footerNotices;
  },
  getMtipGuideLists: (state) => state.mtipGuideLists,
  getMtipGuideList(state) {
    return state.mtipGuideList;
  },
  isPostLiked: (state) => (user_no, mtip_board_no) => {
    return state.likedPosts[user_no]?.includes(mtip_board_no) || false;
  },
  isLiked: state => state.isLiked,
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
