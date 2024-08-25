// src/store/modules/position.js
import api from '@/api/axios';

const state = {  // 애플리케이션의 상태를 저장
    labels : [],
    togetherTargets: [], // 참여형 목표 저장
    personalTargets: [], // 개인형 목표 저장
    adminTargets: [],  // 관리자가 등록한 모든 목표를 저장
    participantsData: {},  // 참가자 관련 데이터 저장
  };
  
  const mutations = { // 상태를 변경하는 동기적 변이
      addTogetherTarget(state, payload) {
          state.togetherTargets.push(payload);
      },
      addPersonalTarget(state, payload) {
          state.personalTargets.push(payload);
      },
      setTogetherTargets(state, targets) {
        state.togetherTargets = targets;
      },
      setPersonalTargets(state, targets) {
          state.personalTargets = targets;
      },
      removeTogetherTargetFromList(state, targetNo) {
        state.togetherTargets = state.togetherTargets.filter(target => target.target_no !== targetNo);
      },
      removePersonalTargetFromList(state, targetNo) {
          state.personalTargets = state.personalTargets.filter(target => target.target_no !== targetNo);
      },
      SET_ADMIN_TARGETS(state, targets) {
        state.adminTargets = targets;
      },
      setTargets(state, targets) {
        state.targets = targets;
      },
      SET_PARTICIPANTS_DATA(state, { targetNo, data }) {
        // 각 타겟 번호에 따른 참가자 데이터를 저장
        state.participantsData = {
            ...state.participantsData,
            [targetNo]: data
        };
      },
      setError(state, error) {
        state.error = error;
      }
   
  };
  
  const actions = {  // 상태를 변경하는 비동기적 액션
    async addTogetherTarget({ commit }, target) {
      try {
          const response = await api.post('/target/create', target);
          commit('addTogetherTarget', response.data);
      } catch (error) {
          console.error('Error adding together target:', error.response ? error.response.data : error.message);
          throw error;
      }
  },
  async addPersonalTarget({ commit }, target) {
      try {
          const response = await api.post('/target/create', target);
          commit('addPersonalTarget', response.data);
      } catch (error) {
          console.error('Error adding personal target:', error.response ? error.response.data : error.message);
          throw error;
      }
  },

    async fetchTogetherTargets({ commit }, userNo) {
      try {
          const response = await api.get(`/target/user/${userNo}?type=together`);
          commit('setTogetherTargets', response.data);
      } catch (error) {
          console.error('Error fetching together targets:', error.response ? error.response.data : error.message);
      }
  },
   
      async fetchPersonalTargets({ commit }, userNo) {
        try {
            const response = await api.get(`/target/user/${userNo}?type=personal`);
            commit('setPersonalTargets', response.data);
        } catch (error) {
            console.error('Error fetching personal targets:', error.response ? error.response.data : error.message);
        }
    },
      async fetchAdminTargets({ commit }, userNo) {
        try {
          console.log('관리자 목표설정 정보 불러오기.js 도착 !', userNo);
          const response = await api.get(`/target/admin/targets/${userNo}`);
          console.log('관리자 목표설정 서버정보:', response.data); // 응답 데이터를 콘솔에 출력
          commit('setTargets', response.data);
          commit('SET_ADMIN_TARGETS', response.data); 
        } catch (error) {
          console.error("Error fetching admin targets:", error);
        }
      },
      // 사용자가 참여한 모든 타겟의 번호를 가져오는 액션
      async checkParticipation(_, { targetNo, userNo }) {
        try {
          console.log("joinTarget.js :", { targetNo, userNo });
          const response = await api.get(`/target/checkParticipation/${targetNo}/${userNo}`);
          return response.data;  // 참여 여부 반환
        } catch (error) {
          console.error('Error checking participation:', error);
          throw error;
        }
      },

      // 사용자가 특정 타겟에 참여하도록 하는 액션
      async joinTarget(_, { targetNo, userNo }) {
        try {
          const response = await api.post('/target/join', { targetNo, userNo });
          console.log('API joinTarget response:', response.data);
          
          if (response.data && response.data.success) {
            return { success: true, message: response.data.message };
          } else {
            return { success: false, message: response.data.message || "서버에서 예상치 못한 응답이 왔습니다." };
          }
        } catch (error) {
          console.error('Error joining target:', error);
          return { success: false, message: error.response?.data?.message || "서버 오류가 발생했습니다" };
        }
      },

      async deleteTarget({ commit }, { userNo, targetNo , type }) {
        try {
          const response = await api.delete(`/target/deleteTarget`, {
            params: { user_no: userNo, target_no: targetNo },
          });
          if (type === 'together') {
            commit('removeTogetherTargetFromList', targetNo);
        } else if (type === 'personal') {
            commit('removePersonalTargetFromList', targetNo);
        }
          return response.data;
        } catch (error) {
          console.error('Error deleting target:', error);
          throw error;
        }
      },
      async deleteTogetherTarget({ dispatch }, { userNo, targetNo }) {
        return dispatch('deleteTarget', { userNo, targetNo, type: 'together' });
      },
    
      async deletePersonalTarget({ dispatch }, { userNo, targetNo }) {
        return dispatch('deleteTarget', { userNo, targetNo, type: 'personal' });
      },
    // 마왕 점수 상승 액션 추가
    async increaseMawangScore(_, { userNo, targetNo }) {
      console.log("마왕 점수 userNo, targetNo :", userNo, targetNo);
      try {
        // POST 요청 시 데이터를 body에 넣어 전달
        const response = await api.post(`/target/increaseMawangScore`, {
          user_no: userNo,
          target_no: targetNo
        });
        console.log('마왕 점수 증가 성공:', response.data);
      } catch (error) {
        // JavaScript에서 스택 트레이스를 출력하는 방법
        console.error('마왕 점수 증가 중 오류 발생:', error);
        throw error;
      }
    },

  // async loadParticipants({ commit }, { targetNo, mileNo }) {
  //   try {
  //       console.log("참가자 목록 서버로 들어갑니다. targetNo:", targetNo);
  //       const response = await api.get(`/target/participants/${targetNo}`, {
  //           params: { mileNo: mileNo}
  //       });

  //       console.log("참가자 데이터 응답:", response.data);

  //       // 서버에서 받은 데이터 저장
  //       commit('SET_PARTICIPANTS_DATA', { targetNo, data: response.data });
        
  //       return response.data;
  //   } catch (error) {
  //       console.error('참가자 로드 실패:', error);
  //       throw error;
  //   }
  // },
};
  
  const getters = {  // 상태를 가져오는 게터
    getTogetherTargets: (state) => state.togetherTargets,
    getPersonalTargets: (state) => state.personalTargets,
    getAdminTargets: (state) => state.adminTargets,
    getParticipantsData: (state) => (targetNo) => {
      return state.participantsData[targetNo] || {};
    },
};
  
  
  export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters,
  };
  