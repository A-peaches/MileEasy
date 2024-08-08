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
  userTotalNotices: 0, // 로그인한 사용자가 작성한 게시글 합계
  bestNotices: [],
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
      state.notice.mtip_board_like--;  // 좋아요 숫자 감소
    } else {
      state.likedPosts[user_no].push(mtip_board_no);
      state.notice.mtip_board_like++;  // 좋아요 숫자 증가
    }
  },
  UPDATE_LIKE_COUNT(state, { mtip_board_no, isLiked }) {
    const notice = state.notices.find(n => n.mtip_board_no === mtip_board_no);
    if (notice) {
      notice.mtip_board_like += isLiked ? 1 : -1;
    }
  },
  SET_USER_TOTAL_NOTICES(state, count) {
    state.userTotalNotices = count;
  },
  SET_BEST_NOTICES(state, notices) {
    state.bestNotices = notices;
  },
};

const actions = {
  async fetchBestNotices({ commit }) {
    try {
      const response = await api.get('/mtip/PlusbestMtiplist');
      commit('SET_BEST_NOTICES', response.data);
      return response;
    } catch (error) {
      console.error('Error fetching best notices:', error);
      throw error;
    }
  },
  // async fetchLikedPosts({ commit }) { // user_no 제거
  //   try {
  //     const response = await api.get('/path/to/liked/posts');
  //     commit('SET_LIKED_POSTS', response.data);
  //   } catch (error) {
  //     console.error('좋아하는 글 가져오기 중 오류 발생:', error);
  //   }
  // },
  async fetchNotices({ commit }) {
    try {
      const response = await api.get('/mtip/Mtiplist');
      commit('SET_NOTICES', response.data);
      return response; // 명시적으로 response 반환
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  },

  // mtipBoard.js 또는 관련 Vuex 모듈
  async fetchNoticeDetail({ commit }, noticeId) { // commit 추가
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

  async toggleLikeAction({ commit }, { mtip_board_no, user_no }) {
    try {
      const response = await api.post('/mtip/toggle-like', { mtip_board_no, user_no });
      commit('TOGGLE_LIKE', { user_no, mtip_board_no });
      commit('UPDATE_LIKE_COUNT', { mtip_board_no, isLiked: response.data.isLiked });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  },

  async fetchUserTotalNotices({ commit }, user_no) {
    try {
      const response = await api.get('/mtip/Mymtiplist', {
        params: {
          user_no: user_no
        }
      });
      const notices = response.data;
      commit('SET_USER_TOTAL_NOTICES', notices.length);
    } catch (error) {
      console.error('Error fetching user total notices:', error.response ? error.response.data : error.message);
    }
  },
};

const getters = {
  getNotices: (state) => state.notices, // 주석 해제
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
  userTotalNotices: (state) => state.userTotalNotices,
  getBestNotices: state => state.bestNotices,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
