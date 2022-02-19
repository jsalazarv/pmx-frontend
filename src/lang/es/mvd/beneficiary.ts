export default {
  list: {
    title: "",
  },
  edit: {
    title: "Editar derechohabiente",
  },
  create: {
    title: "Alta derechohabiente",
  },
  delete: {
    title: "",
  },
  attributes: {
    assignmentNumber: "Número de asignación",
    workerValidity: "Vigencia trabajador (titular)",
    coding: "Codificación",
    names: "Nombres",
    lastname: "Apellido paterno",
    surname: "Apellido materno",
    curp: "CURP derechohabiente",
    birthday: "Fecha de nacimiento",
    age: "Edad",
    gender: "Sexo",
    validity: "Vigencia",
    address: "Domicilio",
    medicalUnit: "Unidad médica",
    observations: "Observaciones",
    country: "Pais",
    state: "Estado",
    municipality: "Municipio",
    locality: "Localidad",
    zipcode: "Código postal",
    suburb: "Colonia",
    street: "Calle",
    outdoorNumber: "Número exterior",
    interiorNumber: "Número interior",
    block: "Manzana",
    lot: "Lote",
    inability: "¿Tiene capacidades diferentes?",
    title: "Renapo",
  },
  labels: {
    validate: "Validar",
    save: "Guardar",
    cancel: "Cancelar",
    select: "Seleccionar",
    newAddress: "Nuevo domicilio...",
    mvd: "Portal Transaccional",
    dialogs: {
      confirmDelete: {},
      successDelete: {},
      errorDelete: {},
      errorUpdate: {
        message: "Ha ocurrido un problema",
      },
      successUpdate: {
        message: "Se ha guardado el derechohabiente correctamente",
      },
      errorCreate: {
        message: "Ha ocurrido un problema",
        error400: "El derechohabiente ya se encuentra dado de alta",
      },
      successCreate: {
        message: "Se ha guardado el derechohabiente correctamente",
      },
      errorValidate: {
        message:
          "Ha ocurrido un problema, posibles causas: 1. Curp no valida 2. Servicio de renapo no disponible",
      },
      errorMessage: {
        error400: "Ha ocurrido un problema:  Curp no valida",
        error500: "Ha ocurrido un problema: Servicio de renapo no disponible",
      },
      errorEnum: {
        errorChildrens:
          "No es posible otorgar la vigencia: debido a que su hijo(a) es mayor a 25 años",
        errorBrothers:
          "No es posible otorgar la vigencia: debido a que su hermano(a) es mayor a 17 años",
      },
    },
    validations: {
      discharged: "El derechohabiente ya se encuentra dado de alta y esta activo",
      isNotDischarged: "El derechohabiente no se encuentra dado de alta",
    },
  },
};
