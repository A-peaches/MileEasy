// src/store/modules/loginHistory.js
import axios from 'axios';

const state = {
  objectLoginHistory: null,
  notices: [],
  notice: null,
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
};

const actions = {
  async fetchNotices({ commit }) {
    try {
      const response = await axios.get('http://localhost:8090/notice/list');
      commit('SET_NOTICES', response.data);
    } catch (error) {
      console.error('Error fetching notices:', error.response ? error.response.data : error.message);
    }
  },
  async fetchNoticeDetail({ commit }, noticeId) {
    try {
      const response = await axios.get(`http://localhost:8090/notice/${noticeId}`);
      commit('SET_NOTICE', response.data);
    } catch (error) {
      console.error('Error fetching notice detail:', error.response ? error.response.data : error.message);
    }
  },
  async incrementViews({ commit }, noticeId) {
    try {
      const response = await axios.post(`http://localhost:8090/notice/increment-views/${noticeId}`);
      if (response.status === 200) {
        commit('INCREMENT_VIEWS', noticeId);
      }
    } catch (error) {
      console.error('Error incrementing views:', error.response ? error.response.data : error.message);
    }
  },
  async addNotice({ commit }, formData) {
    try {
      const response = await axios.post('http://localhost:8090/notice/write', formData, {
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
  }
};


const getters = {
  getNotices(state) {
    return state.notices;
  },
  getNotice(state) {
    return state.notice;
  },
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
