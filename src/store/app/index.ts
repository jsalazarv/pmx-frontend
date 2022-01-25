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
    colorText: "",
    colorBtn: "",
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
        colorText: "",
        colorBtn: "",
      };

      switch (status) {
        case 200:
          notifyModel.text = "Petición Exitosa";
          notifyModel.colorText = "green";
          notifyModel.colorBtn = "green";
          break;
        case 204:
          notifyModel.text = "Petición Exitosa";
          notifyModel.colorText = "green";
          notifyModel.colorBtn = "green";
          break;
        case 400:
          notifyModel.text = text;
          notifyModel.colorText = "orange";
          notifyModel.colorBtn = "orange";
          break;
        case 404:
          notifyModel.text = "Registro no Encontrado";
          notifyModel.colorText = "orange";
          notifyModel.colorBtn = "orange";
          break;
        case 500:
          notifyModel.text = "Error Interno en el Servidor";
          notifyModel.colorText = "white";
          notifyModel.colorBtn = "red";
          break;
        default:
          notifyModel.text = "Petición Exitosa";
          notifyModel.colorText = "green";
          notifyModel.colorBtn = "green";
      }

      commit("SET_NOTIFY", notifyModel);

      setTimeout(() => {
        notifyModel.open = false;
        notifyModel.colorText = "";
        notifyModel.colorBtn = "";
        notifyModel.text = "";
        commit("SET_NOTIFY", notifyModel);
      }, 8000);
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
