import { IAppState } from "@/store/app/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";

const appStore: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    layout: "public-layout",
    sidebar: {
      open: true,
      miniVariant: true,
    },
  },
  mutations: {
    SET_LAYOUT(state, layout: string) {
      state.layout = layout;
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebar.open = !state.sidebar.open;
    },
  },
  getters: {},
  actions: {
    toggleSidebar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
  },
};

export default appStore;
