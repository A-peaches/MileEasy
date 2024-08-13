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
  SET_LIKE_STATUS(state, { user_no, mtip_board_no, isLiked }) {
    if (!state.likedPosts[user_no]) {
      state.likedPosts[user_no] = [];
    }
    const index = state.likedPosts[user_no].indexOf(mtip_board_no);
    if (isLiked && index === -1) {
      state.likedPosts[user_no].push(mtip_board_no);
    } else if (!isLiked && index !== -1) {
      state.likedPosts[user_no].splice(index, 1);
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
  SET_LIKED_POSTS(state, { user_no, likedPosts }) {
    state.likedPosts[user_no] = likedPosts;
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
  async likePost({ commit }, { mtip_board_no, user_no }) {
    try {
      const response = await api.post('/mtip/like', { mtip_board_no, user_no });
      console.log('좋아요 증가 :', response.data); // 서버 응답 로그 출력
  
      // 서버에서 받은 상태를 기반으로 상태를 업데이트
      if (response.data !== -1) {
        commit('SET_LIKE_STATUS', { user_no, mtip_board_no, isLiked: true });
      }
      console.log('좋아요 증가 :', response.data); // 서버 응답 로그 출력
      return response.data;
    } catch (error) {
      console.error('Error liking post:', error);
      throw error;
    }
  },
  
  async unlikePost({ commit }, { mtip_board_no, user_no }) {
    try {
      const response = await api.post('/mtip/unlike', { mtip_board_no, user_no });
      console.log('좋아요 감소:', response.data); // 서버 응답 로그 출력
  
      // 서버에서 받은 상태를 기반으로 상태를 업데이트
      if (response.data !== -1) {
        commit('SET_LIKE_STATUS', { user_no, mtip_board_no, isLiked: false });
      }
      console.log('좋아요 감소 :', response.data); // 서버 응답 로그 출력
      return response.data;
    } catch (error) {
      console.error('Error unliking post:', error);
      throw error;
    }
  },

async checkLikeStatus({ commit }, { mtip_board_no, user_no }) {
  try {
      const response = await api.get('/mtip/check-like', {
          params: { mtip_board_no, user_no },
      });
      // 필요한 로직 처리
      const isLiked = response.data.isLiked;
      commit('SET_LIKE_STATUS', { user_no, mtip_board_no, isLiked });
      return isLiked;
  } catch (error) {
      console.error('Error checking like status:', error);
  }
},
async fetchLikedPosts({ commit }, user_no) {
  try {
    const response = await api.get(`/mtip/liked-posts/${user_no}`);
    commit('SET_LIKED_POSTS', { user_no, likedPosts: response.data });
  } catch (error) {
    console.error('Error fetching liked posts:', error);
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
