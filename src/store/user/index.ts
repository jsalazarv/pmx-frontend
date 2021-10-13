import { Module } from "vuex";
import { IUserStore } from "@/store/user/types";
import { IRootState } from "@/store/types";

const userStore: Module<IUserStore, IRootState> = {
  namespaced: true,
  state: {
    usuario: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.usuario = userData;
    },
    CLEAR_USER_DATA(state) {
      state.usuario = null;
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
};

export default userStore;
