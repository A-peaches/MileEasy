import api from '@/api/axios';

const state = {
  objectLoginHistory: null,
  notices: [],
  notice: null,
  footerNotices: [],
  mtipGuideList: [],
  mtipGuideLists: [],
  likedPosts: {}, // 좋아요 상태 저장
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
  SET_LIKE_STATUS(state, { user_no, mtip_board_no, isLiked }) {
    if (!state.likedPosts[user_no]) {
      state.likedPosts[user_no] = [];
    }
    if (isLiked) {
      state.likedPosts[user_no].push(mtip_board_no);
    } else {
      const index = state.likedPosts[user_no].indexOf(mtip_board_no);
      if (index !== -1) {
        state.likedPosts[user_no].splice(index, 1);
      }
    }
  },
  SET_LIKED_POSTS(state, { user_no, likedPosts }) {
    state.likedPosts[user_no] = likedPosts;
  },
  TOGGLE_LIKE(state, { user_no, mtip_board_no }) {
    if (!state.likedPosts[user_no]) {
      state.likedPosts[user_no] = [];
    }
    const index = state.likedPosts[user_no].indexOf(mtip_board_no);
    if (index !== -1) {
      state.likedPosts[user_no].splice(index, 1);
      if (state.notice && state.notice.mtip_board_no === mtip_board_no) {
        state.notice.mtip_board_like--;
      }
    } else {
      state.likedPosts[user_no].push(mtip_board_no);
      if (state.notice && state.notice.mtip_board_no === mtip_board_no) {
        state.notice.mtip_board_like++;
      }
    }
  },
  UPDATE_LIKE_COUNT(state, { mtip_board_no, isLiked }) {
    const notice = state.notices.find(n => n.mtip_board_no === mtip_board_no);
    if (notice) {
      notice.mtip_board_like += isLiked ? 1 : -1;
    }
    if (state.notice && state.notice.mtip_board_no === mtip_board_no) {
      state.notice.mtip_board_like += isLiked ? 1 : -1;
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
  async fetchNotices({ commit }) {
    try {
      const response = await api.get('/mtip/Mtiplist');
      commit('SET_NOTICES', response.data);
      return response; // 명시적으로 response 반환
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  },
  // async fetchNoticeDetail({ commit }, noticeId) {
  //   if (!noticeId) {
  //     console.error('Notice ID is undefined');
  //     return;
  //   }
  //   try {
  //     console.log('Fetching notice detail for ID:', noticeId);
  //     const { data } = await api.get(`/mtip/${noticeId}`);
  //     console.log('API Response:', data); // 전체 응답 로깅
  //     if (data) {
  //       console.log('Fetched notice details:', data);
  //       commit('SET_NOTICE', data);
  //       return data; // 명시적으로 데이터 반환
  //     } else {
  //       console.error('No data in response');
  //       throw new Error('No data in response');
  //     }
  //   } catch (error) {
  //     console.error(
  //       'Error fetching notice detail:',
  //       error.response ? error.response.data : error.message
  //     );
  //     throw error; // 에러를 다시 throw하여 컴포넌트에서 캐치할 수 있게 함
  //   }
  // },
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
      commit('SET_LIKE_STATUS', {
        user_no,
        mtip_board_no,
        isLiked: response.data.isLiked
      });
    } catch (error) {
      console.error('Error checking like status:', error);
    }
  },
  async toggleLikeAction({ commit }, { mtip_board_no, user_no }) {
    try {
      const response = await api.post('/mtip/toggle-like', { mtip_board_no, user_no });
      commit('TOGGLE_LIKE', { user_no, mtip_board_no });
      console.log('like',response);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  },
  async fetchNoticeDetail({ commit }, noticeId) {
    if (!noticeId) {
      console.error('Notice ID is undefined');
      return;
    }
    try {
      const { data } = await api.get(`/mtip/${noticeId}`);
      if (data) {
        commit('SET_NOTICE', data);
        return data;
      } else {
        throw new Error('No data in response');
      }
    } catch (error) {
      console.error('Error fetching notice detail:', error);
      throw error;
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
