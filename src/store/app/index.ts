import { IAppState, IModuleMenu, Notify } from "@/store/app/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";
import mfe from "@/components/layouts/partials/menu/mfe";
import { es, en } from "@/plugins/index";

const initialState: IAppState = {
  layout: "public-layout",
  sidebar: {
    open: true,
    miniVariant: true,
    currentMenu: mfe,
  },
  notifyModel: {
    open: true,
    text: "",
    colorText: "",
    colorBtn: "",
  },
};

const appStore: Module<IAppState, IRootState> = {
  namespaced: true,
  state: {
    ...initialState,
  },
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
    SET_NOTIFY(state, notify: Notify) {
      state.notifyModel = notify;
    },
  },
  getters: {
    getLanguages() {
      return Object.keys({
        es,
        en,
      });
    },
  },
  actions: {
    toggleSidebar({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    setCurrentMenu({ commit }, menu: IModuleMenu) {
      commit("SET_CURRENT_MENU", menu);
    },
    setNotify({ commit }, notify: Notify) {
      commit("SET_NOTIFY", notify);

      setTimeout(() => {
        notify.open = false;
        notify.colorText = "";
        notify.colorBtn = "";
        notify.text = "";
        commit("SET_NOTIFY", notify);
      }, 3000);
    },
    clearNotify({ commit }) {
      const notifyModel: Notify = {
        open: false,
        text: "",
        colorText: "",
        colorBtn: "",
      };
      commit("SET_NOTIFY", notifyModel);
    },
  },
};

export default appStore;
