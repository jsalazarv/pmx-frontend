import Vue from "vue";
import Vuex from "vuex";
import app from "./app";
import user from "./user";
import empleados from "./people";
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
    empleados,
  },
  plugins: [vuexPersist.plugin],
});
