import { IAppState, IModuleMenu, Notify } from "@/store/app/types";
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
  notifyModel: {
    open: true,
    text: "",
    color: "",
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
    SET_NOTIFY(state, notify: Notify) {
      state.notifyModel = notify;
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
    setNotify({ commit }, { status, text }) {
      const notifyModel: Notify = {
        open: true,
        text: "",
        color: "",
      };

      switch (status) {
        case 400:
          notifyModel.text = text;
          notifyModel.color = "orange";
          commit("SET_NOTIFY", notifyModel);
          break;
        case 404:
          notifyModel.text = "Registro no Encontrado";
          notifyModel.color = "orange";
          commit("SET_NOTIFY", notifyModel);
          break;
        case 500:
          notifyModel.text = "Error Interno en el Servidor";
          notifyModel.color = "red";
          commit("SET_NOTIFY", notifyModel);
          break;
        default:
          notifyModel.text = "Petición Exitosa";
          notifyModel.color = "green";
          commit("SET_NOTIFY", notifyModel);
      }

      setTimeout(() => {
        notifyModel.open = false;
        notifyModel.color = "";
        notifyModel.text = "";
        commit("SET_NOTIFY", notifyModel);
      }, 3000);
    },
    clearNotify({ commit }) {
      const notifyModel: Notify = {
        open: false,
        text: "",
        color: "",
      };
      commit("SET_NOTIFY", notifyModel);
    },
  },
};

export default appStore;
