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
    mvd: "Portal Transaccional",
    dialogs: {
      confirmDelete: {},
      successDelete: {},
      errorDelete: {},
      errorUpdate: {},
      successUpdate: {},
      errorCreate: {},
      successCreate: {},
    },
    customValidations: {
      renapoNotAvailable:
        "A problem has occurred: Renapo service not available",
      errorChildrens:
        "It is not possible to grant the validity: because your child is older than 25 years",
      errorBrothers:
        "It is not possible to grant validity: because your sibling is older than 17 years",
      beneficiaryAlreadyActive:
        "The beneficiary is already registered and is active",
      beneficiaryAlreadyInactive:
        "The beneficiary is already registered and is inactive",
      beneficiaryNotRegistered: "The beneficiary does not exist registered",
      beneficiaryRegisteredAvaialble:
        "The beneficiary is already registered and is available to edit it",
      beneficiaryRegisteredNotAvaialble:
        "The beneficiary is already registered but is not available to edit it",
      beneficiaryNotRegisteredUpdated:
        "There is no registered beneficiary, your information will be completely updated when you select",
    },
  },
};
