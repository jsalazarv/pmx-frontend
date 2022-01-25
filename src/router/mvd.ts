export default [
  {
    path: "/mvd/empleados/busqueda",
    name: "mvd:people:searchEmployee",
    component: () => import("@/views/mvd/searchEmployee/SearchEmployee.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:
      "/mvd/empleados/consulta/:paramEmployeeId?/:paramEmployeeTypeId?/:paramIdPerson?",
    name: "mvd:people:employeeConsultation",
    props: true,
    component: () =>
      import("@/views/mvd/employeeConsultation/EmployeeConsultation.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:
      "/mvd/domicilio/editar/:paramEmployeeId?/:paramEmployeeTypeId?/:paramIdPerson?",
    name: "address:editAddress",
    props: true,
    component: () => import("@/views/mvd/address/EditAddress.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:
      "/mvd/domicilio/nuevo/:paramEmployeeId?/:paramEmployeeTypeId?/:paramIdPerson?",
    name: "address:newAddress",
    props: true,
    component: () => import("@/views/mvd/address/NewAddress.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:
      "/mvd/derechohabiente/alta/:paramEmployeeId?/:paramEmployeeTypeId?/:paramIdPerson?",
    name: "beneficiary:newBeneficiary",
    props: true,
    component: () => import("@/views/mvd/beneficiary/NewBeneficiary.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:
      "/mvd/derechohabiente/editar/:paramEmployeeId?/:paramEmployeeTypeId?/:paramIdPerson?/:paramIdBeneficiary?",
    name: "beneficiary:editBeneficiary",
    props: true,
    component: () => import("@/views/mvd/beneficiary/EditBeneficiary.vue"),
    meta: { requiresAuth: true },
  },
  {
    path:
      "/mvd/credencializacion/:paramEmployeeId?/:paramEmployeeTypeId?/:paramIdPerson?",
    name: "credentialization:credentialization",
    props: true,
    component: () =>
      import("@/views/mvd/credentialization/Credentialization.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/mvd/reportes/",
    name: "report:list",
    component: () => import("@/views/mvd/report/Report.vue"),
    meta: { requiresAuth: true },
  },
];
