export default {
  list: {
    title: "",
  },
  edit: {
    title: "Edit beneficiary",
  },
  create: {
    title: "New beneficiary",
  },
  delete: {
    title: "",
  },
  attributes: {
    assignmentNumber: "Assignment number",
    workerValidity: "Workery validity (headline)",
    coding: "Coding",
    names: "Names",
    lastname: "Lastname",
    surname: "Surname",
    curp: "beneficiary CURP",
    birthday: "Birthday",
    age: "Age",
    gender: "Gender",
    validity: "Validity",
    address: "Address",
    medicalUnit: "Medical unit",
    observations: "Observations",
    country: "Country",
    state: "State",
    municipality: "Municipality",
    locality: "locality",
    zipcode: "Zip code",
    suburb: "Suburb",
    street: "Street",
    outdoorNumber: "Outdoor number",
    interiorNumber: "Interior number",
    block: "Block",
    lot: "Lot",
    inability: "Do you have different abilities?",
    title: "Renapo",
  },
  labels: {
    validate: "Validate",
    save: "Save",
    cancel: "Cancel",
    select: "Select",
    newAddress: "New address...",
    mvd: "MVD",
    dialogs: {
      confirmDelete: {},
      successDelete: {},
      errorDelete: {},
      errorUpdate: {
        message: "A problem has occurred",
      },
      successUpdate: {
        message: "Beneficiary has been saved correctly",
      },
      errorCreate: {
        message: "A problem has occurred",
      },
      successCreate: {
        message: "Beneficiary has been saved correctly",
      },
      errorValidate: {
        message:
          "A problem has occurred, possible causes: 1. Curp not valid 2. Renapo service not available",
      },
    },
    validations: {
      discharged: "The beneficiary is already registered",
      isNotDischarged: "",
    },
  },
};
