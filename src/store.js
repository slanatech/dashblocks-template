import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dark: (localStorage['sws-dark-mode'] || 'false') === 'true',
    refreshTrigger: 0,
    refreshTimeout: 5000,
    refreshLast: 0,
    intervalId: null,
    rotateTrigger: 0,
    rotateLast: 0,
    rotateTimeout: 15000,
    dashboardSpec: ''
  },
  mutations: {
    SET_DARK(state, { dark }) {
      localStorage['sws-dark-mode'] = dark;
      state.dark = dark;
    },
    SET_INTERVAL_ID(state, { id }) {
      state.intervalId = id;
    },
    SET_REFRESH_TIMEOUT(state, { timeout }) {
      state.refreshTimeout = timeout;
    },
    PERFORM_REFRESH(state) {
      state.refreshLast = Date.now();
      state.refreshTrigger = state.refreshLast;
    },
    PERFORM_ROTATE(state) {
      state.rotateLast = Date.now();
      state.rotateTrigger = state.rotateLast;
    },
    SET_DB_SPEC(state, { spec }) {
      state.dashboardSpec = spec;
    }
  },
  actions: {
    setDark({ commit }, { dark }) {
      commit('SET_DARK', { dark: dark });
    },
    initRefresh({ commit, state }) {
      if (state.intervalId) {
        return; // Already set up
      }
      let intervalId = setInterval(() => {
        if (state.refreshTimeout === 0) {
          return;
        }
        let tsNow = Date.now();
        let elapsed = tsNow - state.refreshLast;
        // If we're almost at refresh interval, refresh
        if (elapsed >= state.refreshTimeout - 100) {
          console.log(`Need to refresh: ${tsNow} - ${elapsed}`);
          commit('PERFORM_REFRESH');
        }
        // If we're almost at rotate interval, rotate
        let rotateElapsed = tsNow - state.rotateLast;
        if (rotateElapsed >= state.rotateTimeout - 100) {
          console.log(`Need to rotate: ${tsNow} - ${rotateElapsed}`);
          commit('PERFORM_ROTATE');
        }
      }, 1000);
      commit('SET_INTERVAL_ID', { id: intervalId });
    },
    setRefreshTimeout({ commit }, { timeout }) {
      commit('SET_REFRESH_TIMEOUT', { timeout: timeout });
    },
    performRefresh({ commit }) {
      commit('PERFORM_REFRESH');
    },
    setDashboardSpec({ commit }, { spec }) {
      commit('SET_DB_SPEC', { spec: spec });
    }
  }
});
