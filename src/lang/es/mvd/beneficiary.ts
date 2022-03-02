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
      errorUpdate: {},
      successUpdate: {},
      successCreate: {},
    },
    customValidations: {
      renapoNotAvailable:
        "Ha ocurrido un problema: Servicio de renapo no disponible",
      errorChildrens:
        "No es posible otorgar la vigencia: debido a que su hijo(a) es mayor a 25 años",
      errorBrothers:
        "No es posible otorgar la vigencia: debido a que su hermano(a) es mayor a 17 años",
      beneficiaryAlreadyActive:
        "Ya esta registrado el derechohabiente y esta activo",
      beneficiaryAlreadyInactive:
        "Ya esta registrado el derechohabiente y esta inactivo",
      beneficiaryNotRegistered: "No existe registrado el derechohabiente",
      beneficiaryRegisteredAvaialble:
        "Ya esta registrado el derechohabiente y esta disponible para editarlo",
      beneficiaryRegisteredNotAvaialble:
        "Ya esta registrado el derechohabiente pero no esta disponible para editarlo",
      beneficiaryNotRegisteredUpdated:
        "No existe registrado el derechohabiente su información se actualizará completamente al seleccionar",
    },
  },
};
