import Vue from "vue";
import Vuex from "vuex";
import app from "./app";
import user from "./user";
import empleados from "./people";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    empleados,
  },
});
