export default [
  {
    path: "/mvd/empleados/busqueda",
    name: "mvd:people:searchEmployee",
    component: () => import("@/views/mvd/searchEmployee/SearchEmployee.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/empleados/consulta",
    name: "mvd:people:employeeConsultation",
    component: () =>
      import("@/views/mvd/employeeConsultation/EmployeeConsultation.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/domicilio/editar/",
    name: "address:editAddress",
    component: () => import("@/views/mvd/address/EditAddress.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/domicilio/nuevo/",
    name: "address:newAddress",
    component: () => import("@/views/mvd/address/NewAddress.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/derechohabiente/alta",
    name: "beneficiary:newBeneficiary",
    component: () => import("@/views/mvd/beneficiary/NewBeneficiary.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/derechohabiente/editar/:id",
    name: "beneficiary:editBeneficiary",
    component: () => import("@/views/mvd/beneficiary/NewBeneficiary.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/credencializacion/",
    name: "credentialization:credentialization",
    component: () => import("@/views/mvd/credentialization/Credentialization.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/reportes/",
    name: "report:list",
    component: () => import("@/views/mvd/report/Report.vue"),
    meta: { requiresAuth: true },
  },
];
