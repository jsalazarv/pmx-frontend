import { Module } from "vuex";
import {
  IEmployeeForm,
  IEmployeeState,
  IEmploymentDataForm,
  IAddress,
  IConfirmForm,
  IContact,
} from "@/store/employee/types";
import { IRootState } from "@/store/types";

const initialState: IEmployeeState = {
  employee: {
    IdTipoEmpleado: null,
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    RFC: "",
    EdoCivil: "",
    Fotografia: "",
    Nacionalidad: "",
    IndRenapo: false,
  },
  employmentData: {
    Folio: "",
    Referencia: "",
    IdCentro: "",
    IdSeccionSindicato: null,
    Observaciones: "",
    EmpresaOrganismoSolicitante: "",
    CentroDeTrabajoSolicitante: "",
    DescripcionDelCentroDeTrabajoSolicitante: "",
    IdSindicato: null,
  },
  address: {
    IdPais: null,
    IdEstado: null,
    IdMunicipio: null,
    Localidad: "",
    CodigoPostal: "",
    Colonia: "",
    Calle: "",
    NumeroInterior: "",
    NumeroExterior: "",
    Manzana: "",
    Lote: "",
  },
  confirmation: {
    Justificacion: "",
    confirmar: null,
  },
  contacts: [
    {
      IdTipoContacto: null,
      Extension: "",
      Detalle: "",
    },
  ],
};

const employeeModule: Module<IEmployeeState, IRootState> = {
  namespaced: true,
  state: { ...initialState },

  mutations: {
    SET_EMPLOYEE_DATA(state, employee: Partial<IEmployeeForm>) {
      state.employee = { ...state.employee, ...employee };
    },
    SET_EMPLOYMENT_DATA(state, employmentData: Partial<IEmploymentDataForm>) {
      state.employmentData = { ...state.employmentData, ...employmentData };
    },
    SET_ADDRESS(state, address: Partial<IAddress>) {
      state.address = { ...state.address, ...address };
    },
    SET_CONFIRMATION(state, confirmationLogData: Partial<IConfirmForm>) {
      state.confirmation = { ...state.confirmation, ...confirmationLogData };
    },
    ADD_CONTACT(state, contactData: IContact) {
      state.contacts.push(contactData);
    },
    CLEAR_CONTACT(state) {
      state.contacts = [
        {
          IdTipoContacto: null,
          Extension: "",
          Detalle: "",
        },
      ];
    },
  },

  actions: {
    setEmployeeData({ commit }, employee: Partial<IEmployeeForm>) {
      commit("SET_EMPLOYEE_DATA", employee);
    },
    setConfirmation({ commit }, confirmation: Partial<IConfirmForm>) {
      commit("SET_CONFIRMATION", confirmation);
    },
    addContact({ commit }, contact: Partial<IContact>) {
      commit("ADD_CONTACT", contact);
    },
    clear({ commit }, employee: Partial<IEmployeeForm>) {
      commit("SET_EMPLOYEE_DATA", { ...initialState.employee, ...employee });
      commit("SET_EMPLOYMENT_DATA", { ...initialState.employmentData });
      commit("SET_ADDRESS", { ...initialState.address });
      commit("SET_CONFIRMATION", { ...initialState.confirmation });
      commit("CLEAR_CONTACT");
    },
  },
};

export default employeeModule;
