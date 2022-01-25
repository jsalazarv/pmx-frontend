export default {
  list: {
    title: "Derechohabientes",
  },
  edit: {
    title: "",
  },
  create: {
    title: "",
  },
  delete: {
    title: "",
  },
  report: {
    title: "",
  },
  info: {
    title: "Consulta empleado",
  },
  attributes: {
    employeeType: "Tipo de empleado",
    assignmentNumber: "Número de asignación",
    groupPersonal: "Grupo personal",
    areaPersonal: "Área de personal",
    fullname: "Nombre completo",
    department: "Departmento",
    departmentCenter: "Centro-depto",
    departmentDescription: "Descripción",
    validity: "Vigencia",
    validityStatus: "Estado de vigencia",
    workplace: "Centro de trabajo",
    names: "Nombre",
    lastname: "Apellido paterno",
    surname: "Apellido materno",
    curp: "CURP",
    relationship: "Parentesco/Codificación",
    inability: "Incapacidad",
  },
  labels: {
    editAddress: "Editar domicilio",
    newAddress: "Nuevo domicilio",
    assignMedicalUnit: "Asignar unidad médica empleado",
    credential: "Credencial empleado",
    addBeneficiary: "Agregar derechohabiente",
    assign: "Asignar",
    cancel: "Cancelar",
    save: "Guardar datos vigencia",
    medicalUnit: "Unidad médica",
    dialogs: {
      confirmDelete: {
        message: "¿Desea eliminar al derechohabiente?",
      },
      successDelete: {},
      errorDelete: {},
      errorUpdate: {},
      successUpdate: {},
      errorCreate: {
        message: "Un problema ha ocurrido",
      },
      successCreate: {
        message: "Se ha guardado al titular correctamente",
      },
      info: {
        message: "El empleado no se encuentra actualmente vigente",
      },
      successAssign: {
        message: "Se ha asigando correctamente",
      },
      errorAssign: {
        message: "Un problema ha ocurrido",
      },
    },
    validations: {
      valid: "Vigente",
      notValid: "No vigente",
      dateGreaterThanToday: "debe ser mayor o igual a la fecha de hoy",
    },
  },
};
