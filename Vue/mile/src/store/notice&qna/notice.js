// src/store/modules/loginHistory.js
import api from '@/api/axios';

const state = {
  objectLoginHistory: null,
  notices: [],
  notice: null,
  footerNotices: [],
  mtipGuideList: [],
  mtipGuideLists: [],
};

const mutations = {
  SET_NOTICES(state, notices) {
    state.notices = notices;
  },
  SET_NOTICE(state, notice) {
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
};

const actions = {
  async fetchNotices({ commit }) {
    try {
      const response = await api.get('/notice/list');
      commit('SET_NOTICES', response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  },

  async fetchNoticeDetail({ commit }, noticeId) {
    try {
      const response = await api.get(`/notice/${noticeId}`);
      commit('SET_NOTICE', response.data);
    } catch (error) {
      console.error(
        'Error fetching notice detail:',
        error.response ? error.response.data : error.message
      );
    }
  },

  async incrementViews({ commit }, noticeId) {
    try {
      await api.post(`/notice/increment-views/${noticeId}`);
      commit('INCREMENT_VIEWS', noticeId);
    } catch (error) {
      console.error('Error incrementing views:', error);
    }
  },

  async addNotice({ commit }, formData) {
    try {
      const response = await api.post('/notice/write', formData, {
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

  async fetchGuideNotices({ commit }) {
    try {
      const response = await api.get('/notice/mTipGuideList');
      commit('setMtipGuideLists', response.data);
    } catch (error) {
      console.error('Error fetching guide notices:', error);
    }
  },

  async MtipGuideDetail({ commit }, mtipGuideNo) {
    try {
      const response = await api.get(`/notice/GudieDetail/${mtipGuideNo}`);
      commit('setMtipGuideList', response.data);
    } catch (error) {
      console.error(
        'Error fetching guide detail:',
        error.response ? error.response.data : error.message
      );
    }
  },

  async guide_incrementViews({ commit }, mtipGuideNo) {
    try {
      await api.post(`/notice/GuideIncrement-views/${mtipGuideNo}`);
      commit('Guide_INCREMENT_VIEWS', mtipGuideNo);
    } catch (error) {
      console.error('Error incrementing guide views:', error);
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
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
