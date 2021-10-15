import { Module } from "vuex";
import {
  ICountries,
  IEmpleado,
  IEmpleadoMFE,
  IEmpleadoRenapo,
  IStoreEmpleados,
} from "@/store/people/types";
import { AxiosResponse } from "axios";
import RenapoPeopleService from "@/services/RenapoPeopleService";
import { IRootState } from "@/store/types";
import LocationService from "@/services/LocationService";

const estadoInicial: IStoreEmpleados = {
  isLoading: false,
  dialogOpen: false,
  empleado: {
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
  dataRenapo: null,
  dataMFE: null,
  countries: [],
};

const peopleStore: Module<IStoreEmpleados, IRootState> = {
  namespaced: true,
  state: { ...estadoInicial },

  mutations: {
    SET_EMPLEADO(state, empleado: IEmpleado) {
      state.empleado = empleado;
    },
    SET_DATA_RENAPO(state, dataRenapo: IEmpleadoRenapo | null) {
      state.dataRenapo = dataRenapo;
    },
    SET_DATA_MFE(state, dataMFE: IEmpleadoMFE | null) {
      state.dataMFE = dataMFE;
    },
    IS_LOADING(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },
    DIALOG_STATUS(state, isOpen: boolean) {
      state.dialogOpen = isOpen;
    },
    SET_DATA_ALL_COUNTRIES(state, allCountries: Array<ICountries>) {
      state.countries = allCountries;
    },
  },

  actions: {
    getEmpleadoPorCurp({ commit }, curp: string) {
      const renapoService = new RenapoPeopleService();
      commit("IS_LOADING", true);
      renapoService
        .findByCurp(curp.trim(), {})
        .then((response: AxiosResponse) => {
          commit("SET_DATA_RENAPO", response.data.data.renapo);
          //TODO Cambiar data obtenida de RENAPO por data MFE
          commit("SET_DATA_MFE", {
            ...response.data.data.renapo,
            nombres: "nombre de prueba MFE",
          });
          commit("DIALOG_STATUS", true);
        })
        .finally(() => {
          commit("IS_LOADING", false);
        });
    },
    setEmpleado({ commit }, empleado: IEmpleado) {
      commit("SET_EMPLEADO", empleado);
    },

    closeDialog({ commit }) {
      commit("DIALOG_STATUS", false);
    },
    clearSelectionData({ commit }) {
      commit("SET_DATA_RENAPO", null);
      commit("SET_DATA_MFE", null);
    },

    getCountries({ commit }) {
      const allCountries = new LocationService();

      commit("IS_LOADING", true);
      allCountries
        .getCountries()
        .then((response: AxiosResponse) => {
          commit("SET_DATA_ALL_COUNTRIES", response.data.data);
        })
        .finally(() => {
          commit("IS_LOADING", false);
        });
    },
  },
};

export default peopleStore;
