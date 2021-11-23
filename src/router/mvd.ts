export default [
  {
    path: "/empleados/busqueda",
    name: "people:searchEmployee",
    component: () => import("@/views/mvd/searchEmployee/SearchEmployee.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/empleados/consulta",
    name: "people:employeeConsultation",
    component: () =>
      import("@/views/mvd/employeeConsultation/EmployeeConsultation.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/derechohabiente/alta",
    name: "beneficiary:newBeneficiary",
    component: () => import("@/views/mvd/beneficiary/Beneficiary.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/derechohabiente/editar/:id",
    name: "beneficiary:editBeneficiary",
    component: () => import("@/views/mvd/beneficiary/Beneficiary.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/domicilio/alta/",
    name: "address:newAdress",
    component: () => import("@/views/mvd/address/Address.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/reportes/",
    name: "report:list",
    component: () => import("@/views/mvd/report/Report.vue"),
    meta: { requiresAuth: true },
  },
];
