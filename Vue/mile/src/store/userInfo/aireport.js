import api from '@/api/axios';
const state = {
  all: '',
  rank: '',
  catchTop: '',
  mile: '',
  dateAi: '',
  myRank: 0,
  chartRank: 0,
  avg_score_json: [],
  my_score_json: [],
  successYN: null,
  isLoading: false,
};

const mutations = {
  setAll(state, payload) {
    state.all = payload;
  },
  setRank(state, payload) {
    state.rank = payload;
  },
  setCatchTop(state, payload) {
    state.catchTop = payload;
  },

  setMile(state, payload) {
    state.mile = payload;
  },
  setDateAi(state, payload) {
    state.dateAi = payload;
  },
  setMyRank(state, payload) {
    state.myRank = payload;
  },
  setChartRank(state, payload) {
    state.chartRank = payload;
  },
  setAvg_score_json(state, payload) {
    state.avg_score_json = payload;
  },
  setMy_score_json(state, payload) {
    state.my_score_json = payload;
  },
  setSuccessYN(state, payload) {
    state.successYN = payload;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
};

const actions = {
  async getReport({ commit }, user_no) {
    console.log(user_no);
    try {
      const response = await api.post('/bot/getAiReport', null, {
        params: { user_no: user_no },
      });
      console.log('뀨', response.data.data);
      if (response.data.success) {
        commit('setAll', response.data.data.comprehensive_analysis);
        commit('setRank', response.data.data.ranking_analysis);
        commit('setCatchTop', response.data.data.catchup_strategy);
        commit('setMile', response.data.data.mileage_analyze);
        commit('setDateAi', response.data.data.ai_report_date.substring(0, 10));
        commit('setMyRank', response.data.data.user_rank);
        commit('setChartRank', 100 - response.data.data.user_rank * 1);

        commit(
          'setAvg_score_json',
          JSON.parse(response.data.data.avg_score_json)
        );
        commit(
          'setMy_score_json',
          JSON.parse(response.data.data.my_score_json)
        );
        commit('setSuccessYN', true);
      } else {
        commit('setSuccessYN', false);
      }
    } catch (error) {
      console.error('Failed to fetch report data:', error);
      commit('setSuccessYN', false);
    } finally {
      commit('setLoading', false);
    }
  },
};

const getters = {
  getAll: (state) => state.all,
  getRank: (state) => state.rank,
  getCatchTops: (state) => state.catchTop,

  getMile: (state) => state.mile,
  getDateAi: (state) => state.dateAi,
  getMyRank: (state) => state.myRank,

  getChartRank: (state) => state.chartRank,
  getAvg_score_json: (state) => state.avg_score_json,
  getMy_score_json: (state) => state.my_score_json,

  getSuccessYN: (state) => state.successYN,
  isLoading: (state) => state.isLoading,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
