import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    switchDark: false,
    dashboardSpec: ''
  },
  mutations: {
    setSwitchDark(state, value) {
      state.switchDark = value;
    },
    SET_DB_SPEC(state, { spec }) {
      state.dashboardSpec = spec;
    }
  },
  actions: {
    setDashboardSpec({ commit }, { spec }) {
      commit('SET_DB_SPEC', { spec: spec });
    }
  }
});
