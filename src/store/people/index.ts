import { Module } from "vuex";
import {
  IPerson,
  IPeopleState,
  IEmploymentData,
  IAddress,
} from "@/store/people/types";
import { IRootState } from "@/store/types";

const initialState: IPeopleState = {
  person: {
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
    /*Nacionalidad: "",
    AnioRegistro: null,
    IdMunicipioRegistro: null,
    IdEntidadNacional: "",
    IdEntidadEmisora: "",*/
  },
  employmentData: {
    Folio: "",
    Referencia: "",
    IdCentro: "",
    IdSeccionSindicato: null,
    Observaciones: "",
    /*EmpresaOrganismoSolicitante: "",
    CentroDeTrabajoSolicitante: "",
    DescripcionDelCentroDeTrabajoSolicitante: "",
    IdSindicato: null,*/
  },
  address: {
    /*IdPais: null,
    IdEstado: null,*/
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
};

const peopleModule: Module<IPeopleState, IRootState> = {
  namespaced: true,
  state: { ...initialState },

  mutations: {
    SET_EMPLOYEE_DATA(state, employee: Partial<IPerson>) {
      state.person = { ...state.person, ...employee };
    },
    SET_EMPLOYMENT_DATA(state, employmentData: Partial<IEmploymentData>) {
      state.employmentData = { ...state.employmentData, ...employmentData };
    },
    SET_ADDRESS(state, address: Partial<IAddress>) {
      state.address = { ...state.address, ...address };
    },
  },

  actions: {
    setPersonData({ commit }, employee: Partial<IPerson>) {
      commit("SET_EMPLOYEE_DATA", employee);
    },
    clear({ commit }, employee: Partial<IPerson>) {
      commit("SET_EMPLOYEE_DATA", { ...initialState.person, ...employee });
      commit("SET_EMPLOYMENT_DATA", { ...initialState.employmentData });
      commit("SET_ADDRESS", { ...initialState.address });
    },
  },
};

export default peopleModule;
