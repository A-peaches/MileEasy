// src/store/modules/position.js
import api from '@/api/axios';

const state = {  // 애플리케이션의 상태를 저장
    labels : [],
    targets: [],
    adminTargets: [],  // 관리자가 등록한 모든 목표를 저장
  };
  
  const mutations = { // 상태를 변경하는 동기적 변이
      addTarget(state, payload) {
        state.labels.push(payload);
      },
      setTargets(state, targets) {
        state.targets = targets;
      },
      SET_ADMIN_TARGETS(state, targets) {
        state.adminTargets = targets;
    },
  };
  
  const actions = {  // 상태를 변경하는 비동기적 액션
    async addTarget({ commit }, target) {
        try {
          console.log('target.js addTarget:',target);
          const response = await api.post('http://localhost:8090/target/create', target);
          commit('addTarget', response.data);
        } catch (error) {
          console.error('Error adding target:', error.response ? error.response.data : error.message);
          throw error; // 에러를 상위로 전파하여 컴포넌트에서 처리할 수 있게 함
        }
      },
      async fetchTargets({ commit }, userNo) {
        try {
          console.log('Targets userNo:', userNo); // 응답 데이터를 콘솔에 출력
          const response = await api.get(`/target/user/${userNo}`);
          console.log('Targets API Response:', response.data); // 응답 데이터를 콘솔에 출력
          commit('setTargets', response.data);
        } catch (error) {
          console.error('Error fetching targets:', error.response ? error.response.data : error.message);
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
    
  };
  
  const getters = {  // 상태를 가져오는 게터
    getTargets: (state) => state.targets,
    getAdminTargets: (state) => state.adminTargets,
  };
  
  
  export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters,
  };
  