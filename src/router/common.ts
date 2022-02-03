export default [
  {
    path: "/users",
    name: "users:list",
    component: () => import("@/views/admin/users/UsersList.vue"),
    meta: { requiresAuth: true },
  },
];
