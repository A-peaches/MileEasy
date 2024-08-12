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
  