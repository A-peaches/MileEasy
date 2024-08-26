// src/store/modules/mtipReply.js
import api from '@/api/axios';

const state = {
  objectMtipReply: null,
  comments: [],
};

const mutations = {
  CLEAR_COMMENTS(state) {
    state.comments = [];
  },
  SET_COMMENTS(state, comments) {
    state.comments = comments;
  },
  ADD_COMMENT(state, comment) {
    state.comments.unshift(comment);
  },
  UPDATE_COMMENT(state, updatedComment) {
    const index = state.comments.findIndex(comment => comment.mtip_reply_no === updatedComment.mtip_reply_no);
    if (index !== -1) {
      state.comments[index] = {
        ...state.comments[index],  // 기존 데이터 유지
        ...updatedComment,         // 새로운 데이터로 덮어쓰기
        isEditing: false
      };
    }
  },
  DELETE_COMMENT(state, commentId) {
    state.comments = state.comments.filter(comment => comment.mtip_reply_no !== commentId);
  },
};

const actions = {


  async fetchComments({ commit }, mtip_board_no) {
    try {
      const response = await api.get(`/mtip/comments/${mtip_board_no}`);
      commit('SET_COMMENTS', response.data.map(comment => ({
        ...comment,
        isEditing: false,
        editingContent: comment.mtip_reply_content,
      })));
    } catch (error) {
      console.error('댓글 가져오기 중 오류가 발생했습니다:', error);
    }
  },
  async addComment({ commit }, commentData) {
    try {
      const response = await api.post('/mtip/comments', commentData);
      commit('ADD_COMMENT', response.data);
      return response.data;  // 응답을 반환해야 합니다.
    } catch (error) {
      console.error('댓글 등록 중 오류가 발생했습니다:', error);
    }
  },
  async updateComment({ commit }, commentData) {
    try {
      const response = await api.put(`/mtip/updateComment/${commentData.mtip_reply_no}`, commentData);
      const updatedComment = response.data;
      commit('UPDATE_COMMENT', updatedComment);
      return updatedComment;
    } catch (error) {
      console.error('댓글 수정 중 오류가 발생했습니다:', error);
      throw error;
    }
  },
  async deleteComment({ commit }, commentId) {
    try {
      await api.delete(`/mtip/deleteComment/${commentId}`);
      commit('DELETE_COMMENT', commentId);
    } catch (error) {
      console.error('댓글 삭제 중 오류가 발생했습니다:', error);
    }
  },
};

const getters = {
  getComments: state => state.comments,
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
