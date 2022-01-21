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
    mvd: "MVD",
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
      },
      successCreate: {
        message: "Se ha guardado el derechohabiente correctamente",
      },
      errorValidate: {
        message:
          "Ha ocurrido un problema, posibles causas: 1. Curp no valida 2. Servicio de renapo no disponible",
      },
    },
    validations: {
      discharged: "El derechohabiente ya se encuentra dado de alta",
      isNotDischarged: "El derechohabiente no se encuentra dado de alta",
    },
  },
};
