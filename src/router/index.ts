import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from "../store/index";
import Login from '@/views/Login.vue';
import Inicio from '@/views/Inicio.vue';
import PeopleCreate from '@/views/people/PeopleCreate.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: Inicio,
    meta: { requiresAuth: true },
    /*children: [
      {
        path: "/opcion1", 
        name: "opcion1",
        component: Opcion1,
        meta: { requiresAuth: true }
      },
      {
        path: "/opcion2", 
        name: "opcion2",
        component: Opcion1,
        meta: { requiresAuth: true }
      },
      {
        path: "/opcion3", 
        name: "opcion3",
        component: Opcion1,
        meta: { requiresAuth: true }
      },
      {
        path: "/hijo1", 
        name: "hijo1",
        component: Opcion1,
        meta: { requiresAuth: true }
      },
      {
        path: "/hijo2", 
        name: "hijo2",
        component: Opcion1,
        meta: { requiresAuth: true }
      }
    ]*/
  },
  {
    path: "/alta",
    name: "people:create",
    component: PeopleCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/opcion2",
    name: "opcion2",
    component: PeopleCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/opcion3",
    name: "opcion3",
    component: PeopleCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/hijo1",
    name: "hijo1",
    component: PeopleCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/hijo2",
    name: "hijo2",
    component: PeopleCreate,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    store.state.usuario === null
  ) {
    next({ path: "/" });
  } else {
    next();
  }
});

export default router
