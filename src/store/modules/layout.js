/*
 * Layout state Vuex Module
 */

//import { dbColors } from 'dashblocks';

const state = {
  dark: (localStorage['ub-dark-mode'] || 'false') === 'true',
  menuAutoExpand: (localStorage['ub-menu-auto-expand'] || 'false') === 'true',
  menuMini: (localStorage['ub-menu-mini'] || 'false') === 'true',
  dashboardColorScheme: localStorage['ub-dashboard-color-scheme'] || 'Standard'
};

const getters = {};

const mutations = {
  SET_DARK(state, { dark }) {
    localStorage['ub-dark-mode'] = dark;
    state.dark = dark;
  },
  SET_MENU_AUTO_EXPAND(state, { menuAutoExpand }) {
    localStorage['ub-menu-auto-expand'] = menuAutoExpand;
    state.menuAutoExpand = menuAutoExpand;
  },
  SET_MENU_MINI(state, { menuMini }) {
    localStorage['ub-menu-mini'] = menuMini;
    state.menuMini = menuMini;
  },
  SET_DASHBOARD_COLOR_SCHEME(state, { dashboardColorScheme }) {
    localStorage['ub-dashboard-color-scheme'] = dashboardColorScheme;
    state.dashboardColorScheme = dashboardColorScheme;
  }
};

const actions = {
  setDark({ commit }, { dark }) {
    commit('SET_DARK', { dark: dark });
  },
  setMenuAutoExpand({ commit }, { menuAutoExpand }) {
    commit('SET_MENU_AUTO_EXPAND', { menuAutoExpand: menuAutoExpand });
  },
  setMenuMini({ commit }, { menuMini }) {
    commit('SET_MENU_MINI', { menuMini: menuMini });
  },
  setDashboardColorScheme({ commit }, { dashboardColorScheme }) {
    commit('SET_DASHBOARD_COLOR_SCHEME', { dashboardColorScheme: dashboardColorScheme });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
