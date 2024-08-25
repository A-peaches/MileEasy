import api from '@/api/axios';

const state = {
  objectMileage: null,
  arrayMileage: [],
  targets: [{}],
};

const mutations = {
  setMileInfo(state, mileInfo) {
    state.mileInfo = mileInfo;
  },
  setArrayMileage(state, payload) {
    state.arrayMileage = payload;
  },
  setTargets(state, payload) {
    state.targets = payload;
  }
};

const actions = {
  // 마일리지 정보를 모두 가져오기
  async getMileage({ commit }) {
    try {
      const response = await api.get(
        '/mileage/getMileage'
      );
      commit('setArrayMileage', response.data);
      console.log('마일리지즐겨찾기에 그 점수 ' ,response.data);
    } catch (error) {
      console.error('Error getting all mileage data:', error);
    }
  },
  // 마일리지 담당자가 목표 설정 등록하기
  async addTarget(context, targetInfo){
    try{
      const response = await api.post(`/mana/addTarget`, targetInfo);
      return response;
    }catch(error){
      console.error('Error update mile Target:', error);
      throw error;
    }
  },
  // 마일리지 담당자가 등록한 목표 리스트 가져오기
  async fetchMileTarget({commit}, mile_no){
    try{
      const response = await api.get(`/mana/targetList/${mile_no}`);
      console.log("마일리지 담당자가 서버에서 넘어온 값 :", response.data);
      commit('setTargets', response.data);
    }catch(error){
      console.error('Error get mile Target:', error);
      throw error;
    }
  },
  // 마일리지 담당자가 등록한 목표 삭제하기
  async targetDelete(context, target_no){
    try{
      const response = await api.get(`/mana/targetDelete/${target_no}`);
      return response;
    }catch(error){
      console.error('Error delete mile Target:', error);
      throw error;
    }
  }
};

const getters = {
  getObjectMileage: (state) => state.objectMileage,
  getArrayMileage: (state) => state.arrayMileage,
  getTargets: (state) => state.targets || [],
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
