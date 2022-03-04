export default {
  list: {
    title: "",
  },
  edit: {
    title: "",
  },
  create: {
    title: "Alta",
  },
  delete: {
    title: "",
  },
  attributes: {
    typeOfEmployee: "Tipo de empleado",
    curp: "CURP",
    assignmentNumber: "Número de asignación",
    assignmentNumberStatus: "Estado de número de asignación",
    invoice: "Folio",
    names: "Nombres",
    lastname: "Apellido paterno",
    surname: "Apellido materno",
    birthday: "Fecha de nacimiento",
    photography: "Fotografía",
    gender: "Sexo",
    rfc: "RFC",
    maritalStatus: "Estado civil",
    reference: "Referencia",
    applicantCompany: "Empresa/Organismo solicitante",
    applicantWorkCenter: "Centro de trabajo solicitante",
    descriptionOfWorkCenter: "Descripción del centro de trabajo solicitante",
    syndicate: "Sindicato",
    syndicateSection: "Sección sindical",
    observations: "Observaciones",
    country: "País",
    state: "Estado",
    municipality: "Municipio",
    location: "Localidad",
    postalCode: "Código postal",
    suburb: "Colonia",
    street: "Calle",
    interiorNumber: "Núm. interior",
    exteriorNumber: "Núm. exterior",
    block: "Manzana",
    lot: "Lote",
    contactType: "Tipo de contacto",
    contactDetail: "Detalle",
    extension: "Extensión",
  },
  labels: {
    add: "Agregar",
    validate: "Validar",
    generateAssignmentNumber: "Registrar",
    enable: "Habilitar validación de CURP",
    continue: "Continuar",
    cancel: "Cancelar",
    back: "Regresar",
    steps: {
      personalInformation: "Informacón personal",
      workingInformation: "Información laboral",
      address: "Dirección",
      contact: "Contacto",
    },
    dialogs: {
      renapo: {
        title: "",
        subtitles: {
          mfe: "MFE",
          renapo: "RENAPO",
        },
        names: "Nombres",
        lastname: "Apellido paterno",
        surname: "Apellido materno",
        birthday: "Fecha de nacimiento",
        gender: "Sexo",
        labels: {
          cancel: "Cancelar",
          select: "Seleccionar",
        },
      },
      existingEmployee: {
        title: "",
        subtitles: {},
        record: "Ficha",
        names: "Nombres",
        lastname: "Apellido paterno",
        surname: "Apellido materno",
        gender: "Sexo",
        birthday: "Fecha de nacimiento",
        labels: {
          confirmData: "Confirmar dato",
          informationText:
            "Debe proporcionar la información que de soporte al rechazo o aceptación. Se generará de asignación al momento de Genera número de asignación.",
          justification: "Justificación",
          confirm: "Confirmar",
          reject: "Rechazar",
        },
      },
      searchNotFound: {
        message: "No se encontraron registros en MFE y RENAPO",
      },
      confirmDelete: {},
      successDelete: {},
      errorDelete: {},
      errorUpdate: {},
      successUpdate: {},
      errorCreate: {},
      successCreate: {},
    },
  },
};
