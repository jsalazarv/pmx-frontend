import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import mfe from "./mfe";
import mvd from "./mvd";
import common from "./common";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  ...mfe,
  ...mvd,
  ...common,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    store.state.user === null
  ) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router;
