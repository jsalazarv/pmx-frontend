import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.usuario = userData;
    },
    CLEAR_USER_DATA(state) {
      state.usuario = null;
      location.reload();
    },
  },
  actions: {
    login({ commit }, credentials) {
      commit("SET_USER_DATA", credentials);
    },
    logout({ commit }) {
      commit("CLEAR_USER_DATA");
    },
  },
  modules: {
  }
})
