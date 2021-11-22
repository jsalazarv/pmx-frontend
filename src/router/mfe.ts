export default [
  {
    path: "/inicio",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/empleados/alta",
    name: "people:create",
    component: () => import("@/views/mfe/employee/EmployeeForm.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/folios/asignacion",
    name: "folios:list",
    component: () => import("@/views/mfe/assignmentFolios/AssignmentFolios.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/bitacora/asignacion",
    name: "affiliationLog:list",
    component: () => import("@/views/mfe/affiliationLog/AffiliationLog.vue"),
    meta: { requiresAuth: true },
  },
];
