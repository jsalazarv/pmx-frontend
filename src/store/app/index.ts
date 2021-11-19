import { IAppState, IModuleMenu } from "@/store/app/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";
import mfe from "@/components/layouts/partials/menu/mfe";

const initialState: IAppState = {
  layout: "public-layout",
  sidebar: {
    open: true,
    miniVariant: true,
    currentMenu: mfe,
  },
};

const appStore: Module<IAppState, IRootState> = {
  namespaced: true,
  state: { ...initialState },
  mutations: {
    SET_LAYOUT(state, layout: string) {
      state.layout = layout;
    },
    TOGGLE_SIDEBAR(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    SET_CURRENT_MENU(state, menu: IModuleMenu) {
      state.sidebar.currentMenu = menu;
    },
  },
  getters: {},
  actions: {
    toggleSidebar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    setCurrentMenu({ commit }, menu: IModuleMenu) {
      commit("SET_CURRENT_MENU", menu);
    },
  },
};

export default appStore;
