import {IAppState} from "@/store/app/types";
import {Module} from "vuex";

const appStore: Module<IAppState, any>  = {
    namespaced: true,
    state: {
        layout: 'public-layout',
        sidebar: {
            open: true,
            miniVariant: false
        }
    },
    mutations: {
        SET_LAYOUT(state, layout: string) {
            state.layout = layout;
        },
        TOGGLE_SIDEBAR(state) {
            state.sidebar.open = !state.sidebar.open;
        }
    },
    getters: {},
    actions: {
        toggleSidebar({ commit }) {
            commit("TOGGLE_SIDEBAR");
        },
    }
};

export default appStore;