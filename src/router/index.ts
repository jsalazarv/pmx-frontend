import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/inicio",
    name: "Inicio",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/empleados/alta",
    name: "people:create",
    component: () => import("@/views/employee/EmployeeForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/folios/asignacion",
    name: "folios:list",
    component: () => import("@/views/assignmentFolios/AssignmentFolios.vue"),
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
