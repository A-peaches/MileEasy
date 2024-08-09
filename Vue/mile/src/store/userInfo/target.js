// src/store/modules/position.js
import api from '@/api/axios';

const state = {  // 애플리케이션의 상태를 저장
    labels : [],
    targets: [],
  };
  
  const mutations = { // 상태를 변경하는 동기적 변이
      addTarget(state, payload) {
        state.labels.push(payload);
      },
      setTargets(state, targets) {
        state.targets = targets;
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
  };
  
  const getters = {  // 상태를 가져오는 게터
    getTargets: (state) => state.targets,
  };
  
  
  export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters,
  };
  