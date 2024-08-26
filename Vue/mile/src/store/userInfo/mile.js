import api from '@/api/axios';

const state = {
  mileInfo: null,
  mileDetail: null,
  arrayMiles: []
};

const mutations = {
  setMileInfo(state, mileInfo) {
    state.mileInfo = mileInfo;
  },
  setMileDetail(state, mileDetail){
    state.mileDetail = mileDetail;
  },
  setArrayMiles(state, payload){
    state.arrayMiles = payload;
  }
};

const actions = {
  async fetchMileInfo({commit}, user_no){
    try{
      const response = await api.get(`/mana/mileIntro/${user_no}`);
      commit('setMileInfo', response.data);
    }catch(error){
      console.error('Error fetching mile info:', error);
    }
  },
  async getMileDetail({commit}, mile_no){
    try{
      const response = await api.get(`/mana/mileDetail/${mile_no}`)
      // reponse.data {
      //  mile_introduce_no: 마일리지 소개글 번호
      //  mile_no: 마일리지 번호
      //  mile_title: 마일리지 상세항목 타이틀
      //  mile_content: 마일리지 상세항목별 내용
      //  mile_route: 마일리지 상세항목별 첨부파일 이름 
      //}
      commit('setArrayMiles', response.data);
    }catch(error){
      console.error('Error get mile detail:', error);
    }
  },
  async getMileModify({commit}, {mile_introduce_no, mile_no}){
    try{
      const response = await api.get(`/mana/mileModifyDetail/${mile_introduce_no}?mile_no=${mile_no}`)
      commit('setMileDetail', response.data);
    }catch(error){
      console.error('Error get modify mile detail:', error);
    }
  },
  async addMile(context, mileInfo){
    try{
      const response = await api.post(`/mana/mileAdd`, mileInfo,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    }catch(error){
      console.error('Error add mile:', error);
      throw error;
    }
  },
  async downloadFile(context, {mile_route}){
    try{
      const response = await api.get(`/mana/downloadFile/${mile_route}`,{
        responseType: 'blob' // 바이너리 데이터를 받는다. 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', mile_route);
      document.body.appendChild(link);
      link.click();
    }catch(error){
      console.error('파일 다운로드 실패', error);
    }
  },
  async deleteMile(context, {mile_introduce_no}){
    try{
      const response = await api.get(`/mana/deleteMile/${mile_introduce_no}`)
      return response;
    }catch(error){
      console.error('Error delete mile:', error);
      throw error;
    }
  },
  
  async updateMile(context, mileInfo){
    try{
      const response = await api.post(`/mana/updateDetail`, mileInfo,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response;
    }catch(error){
      console.error('Error update mile:', error);
      throw error;
    }
  }
  
};

const getters = {
  getMileInfo: (state) => state.mileInfo,
  getMileDetail: (state) => state.mileDetail,
  getArrayMiles: (state) => state.arrayMiles
};


export default {
  namespaced: true, 
  state,
  mutations,
  actions,
  getters,
};
