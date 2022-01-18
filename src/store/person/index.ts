import {
  IPersonData,
  IRenapoData,
  IPersonValidationState,
} from "@/store/person/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";

const initialState: IPersonValidationState = {
  Renapo: {
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Sexo: "",
    FechaNacimiento: "",
    Nacionalidad: "",
    AnioRegistro: 0,
    IdMunicipioRegistro: 0,
    IdEntidadNacional: "",
    IdEntidadEmisora: "",
  },
  Person: {
    IdPersona: 0,
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    Rfc: "",
    EstadoCivil: "",
    IndRenapo: false,
    Fotografia: "",
    FechaFoto: "",
    Firma: "",
    SiglasEntidad: "",
    Nacionalidad: "",
    DpDocumento: 0,
    DpEntidad: 0,
    DpFoja: 0,
    DpMunicipio: 0,
    DpAnio: 0,
    DpLibro: 0,
    DpCrip: "",
    DpMigracion: 0,
    DpNatura: 0,
    DpCertifica: 0,
    Archivo: "",
    PfechaAlta: "",
    PFolioConstancia: 0,
    PEstatus: 0,
    XEstatus: "",
    YEstatus: "",
    ZEstatus: "",
    Marca: "",
    CError: 0,
    Observacion: "",
    DpActa: 0,
    DpTomo: 0,
  },
};

const personStore: Module<IPersonValidationState, IRootState> = {
  namespaced: true,
  state: initialState,
  mutations: {
    SET_RENAPO_DATA(state, renapo: Partial<IRenapoData>) {
      state.Renapo = { ...state.Renapo, ...renapo };
    },
    SET_PERSON_DATA(state, person: Partial<IPersonData>) {
      state.Person = { ...state.Person, ...person };
    },
  },

  actions: {
    setRenapoData({ commit }, renapo: Partial<IRenapoData>) {
      commit("SET_RENAPO_DATA", renapo);
    },
    setPersonData({ commit }, person: Partial<IPersonData>) {
      commit("SET_PERSON_DATA", person);
    },
  },
};

export default personStore;
