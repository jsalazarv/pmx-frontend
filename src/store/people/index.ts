import { Module } from "vuex";
import { ICountries, IPerson, IPeopleState } from "@/store/people/types";
import { AxiosResponse } from "axios";
import { IRootState } from "@/store/types";
import LocationService from "@/services/LocationService";

const estadoInicial: IPeopleState = {
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
  countries: [],
};

const peopleStore: Module<IPeopleState, IRootState> = {
  namespaced: true,
  state: { ...estadoInicial },

  mutations: {
    SET_EMPLOYEE_DATA(state, employee: Partial<IPerson>) {
      state.person = { ...state.person, ...employee };
    },
    SET_DATA_ALL_COUNTRIES(state, allCountries: Array<ICountries>) {
      state.countries = allCountries;
    },
  },

  actions: {
    setPersonData({ commit }, employee: Partial<IPerson>) {
      commit("SET_EMPLOYEE_DATA", employee);
    },

    getCountries({ commit }) {
      const allCountries = new LocationService();

      //commit("IS_LOADING", true);
      allCountries
        .getCountries()
        .then((response: AxiosResponse) => {
          commit("SET_DATA_ALL_COUNTRIES", response.data.data);
        })
        .finally(() => {
          //commit("IS_LOADING", false);
        });
    },
  },
};

export default peopleStore;
