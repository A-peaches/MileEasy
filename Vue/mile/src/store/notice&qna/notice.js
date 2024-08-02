// src/store/modules/loginHistory.js
import api from '@/api/axios';

const state = {
  objectLoginHistory: null,
  notices: [],
  notice: null,
  footerNotices :[]
};

const mutations = {
  SET_NOTICES(state, notices) {
    state.notices = notices;
  },
  SET_NOTICE(state, notice) {
    state.notice = notice;
  },
  INCREMENT_VIEWS(state, noticeId) {
    const notice = state.notices.find(n => n.notice_board_no === noticeId);
    if (notice) {
      notice.notice_board_hit = (notice.notice_board_hit || 0) + 1;
    }
  },
  setFooterNotices(state, payload) {
    state.footerNotices = payload;
  }
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
      console.error('Error fetching notice detail:', error.response ? error.response.data : error.message);
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
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        commit('ADD_NOTICE', response.data);
      }
    } catch (error) {
      console.error('Error adding notice:', error.response ? error.response.data : error.message);
    }
  },
  async getFooterNotice({ commit }) {
    try {
      const response = await api.get(
        '/notice/getFooterNotice'
      );
      commit('setFooterNotices', response.data);
    } catch (error) {
      console.error('Error getting footer Notice data:', error);
    }
  },
};


const getters = {
  getNotices: state => state.notices,
  getNotice(state) {
    return state.notice;
  },
  getFooterNotices(state) {
    return state.footerNotices;
  }
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
