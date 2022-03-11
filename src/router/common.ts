export default [
  {
    path: "/users",
    name: "users:list",
    component: () => import("@/views/admin/users/UsersList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/profiles",
    name: "profiles:list",
    component: () => import("@/views/admin/profiles/ProfilesList.vue"),
    meta: { requiresAuth: true },
  },
];
