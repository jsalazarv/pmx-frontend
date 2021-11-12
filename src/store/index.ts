import Vue from "vue";
import Vuex from "vuex";
import app from "./app";
import user from "./user";
import consultation from "./consultation";
import employees from "./employee";
import VuexPersistence from "vuex-persist";
import { IRootState } from "@/store/types";

Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  key: "vuex",
  storage: window.localStorage,
  reducer: (state: IRootState) => ({
    app: state.app,
  }),
});

const vuexPersist2 = new VuexPersistence({
  key: "xx",
  storage: window.localStorage,
  reducer: (state: IRootState) => ({ consultation: state.consultation }),
});

export default new Vuex.Store({
  modules: {
    app,
    user,
    consultation,
    employees,
  },
  plugins: [vuexPersist.plugin, vuexPersist2.plugin],
});
