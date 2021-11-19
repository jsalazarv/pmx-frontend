export default [
  {
    path: "/empleados/busqueda",
    name: "people:searchEmployee",
    component: () => import("@/views/searchEmployee/SearchEmployee.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/empleados/consulta",
    name: "people:employeeConsultation",
    component: () =>
      import("@/views/employeeConsultation/EmployeeConsultation.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/derechohabiente/alta",
    name: "beneficiary:newBeneficiary",
    component: () => import("@/views/beneficiary/Beneficiary.vue"),
    meta: { requiresAuth: true },
  },
];
