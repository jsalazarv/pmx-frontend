import { Module } from "vuex";
import { IPerson, IPeopleState } from "@/store/people/types";
import { IRootState } from "@/store/types";

const initialState: IPeopleState = {
  person: {
    curp: "",
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    sexo: "",
    fechaNacimiento: "",
    nacionalidad: "",
    anioRegistro: null,
    idMunicipioRegistro: null,
    idEntidadNacional: "",
    idEntidadEmisora: "",
  },
  employmentData: {
    referencia: "",
    empresaOrganismoSolicitante: "",
    centroDeTrabajoSolicitante: "",
    descripcionDelCentroDeTrabajoSolicitante: "",
    idSindicato: null,
    idSeccionSindical: null,
    observaciones: "",
  },
  address: {
    idPais: null,
    idEstado: null,
    idMunicipio: null,
    codigoPostal: "",
    colonia: "",
    numeroInterior: "",
    numeroExterior: "",
    manzana: "",
    lote: "",
  },
};

const peopleModule: Module<IPeopleState, IRootState> = {
  namespaced: true,
  state: { ...initialState },

  mutations: {
    SET_EMPLOYEE_DATA(state, employee: Partial<IPerson>) {
      state.person = { ...state.person, ...employee };
    },
  },

  actions: {
    setPersonData({ commit }, employee: Partial<IPerson>) {
      commit("SET_EMPLOYEE_DATA", employee);
    },
  },
};

export default peopleModule;
