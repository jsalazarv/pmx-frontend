import Vue from "vue";
import Vuex from "vuex";
import app from "./app";
import user from "./user";
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

export default new Vuex.Store({
  modules: {
    app,
    user,
    employees,
  },
  plugins: [vuexPersist.plugin],
});
