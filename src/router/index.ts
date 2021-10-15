import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import EmployeeForm from "@/views/employee/EmployeeForm.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/inicio",
    name: "Inicio",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/alta",
    name: "people:create",
    component: EmployeeForm,
    meta: { requiresAuth: true },
  },
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
