/*
 * Layout state Vuex Module
 */

const state = {
  dark: (localStorage['ub-dark-mode'] || 'false') === 'true',
  menuAutoExpand: (localStorage['ub-menu-auto-expand'] || 'false') === 'true'
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
  }
};

const actions = {
  setDark({ commit }, { dark }) {
    commit('SET_DARK', { dark: dark });
  },
  setMenuAutoExpand({ commit }, { menuAutoExpand }) {
    commit('SET_MENU_AUTO_EXPAND', { menuAutoExpand: menuAutoExpand });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
