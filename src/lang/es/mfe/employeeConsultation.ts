export default {
  list: {
    title: "Búsqueda de empleado",
  },
  show: {
    title: "Consulta empleado",
  },
  edit: {
    title: "Editar empleado",
  },
  create: {
    title: "",
  },
  delete: {
    title: "",
  },
  attributes: {
    typeOfEmployee: "Tipo de empleado",
    names: "Nombres",
    lastname: "Apellido paterno",
    surname: "Apellido materno",
    curp: "CURP",
    assignmentNumber: "Número de asignación",
  },
  labels: {
    add: "Agregar",
    edit: "Editar",
    update: "Actualizar",
    export: "Exportar",
    search: "Buscar",
    delete: "Eliminar",
    dialogs: {
      searchNotFound: {
        message: "",
      },
      confirmDelete: {
        title: "",
        body: {
          label1: "Estas por eliminar a",
          label2: "con el número de asignacion",
          label3:
            "Para continuar con esta acción ingresa el motivo de la cancelación",
          justification: "Justificación",
        },
        actions: {
          accept: "Aceptar",
          dismiss: "Rechazar",
        },
      },
      successDelete: {},
      errorDelete: {},
      errorUpdate: {},
      successUpdate: {},
      errorCreate: {},
      successCreate: {},
    },
  },
};
