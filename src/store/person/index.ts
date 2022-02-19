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
    IdPersona: null,
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    IndRenapo: false,
    Baja: false,
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
    clear({ commit }) {
      commit("SET_RENAPO_DATA", initialState.Renapo);
      commit("SET_PERSON_DATA", initialState.Person);
    },
  },
};

export default personStore;
