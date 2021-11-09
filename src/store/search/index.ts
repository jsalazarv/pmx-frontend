import { Module } from "vuex";
import { ISearch } from "@/store/search/types";
import { IRootState } from "@/store/types";

const initialState: ISearch = {
  IdTipoEmpleado: 0,
  Curp: "",
  Nombres: "",
  ApellidoPaterno: "",
  ApellidoMaterno: "",
  NumeroAsignacion: 0,
};

const searchModule: Module<ISearch, IRootState> = {
  namespaced: true,
  state: { ...initialState },

  mutations: {
    SET_SEARCH_DATA(state, search: Partial<ISearch>) {
      state = { ...state, ...search };
    },
  },

  actions: {
    setSearchData({ commit }, search: Partial<ISearch>) {
      commit("SET_SEARCH_DATA", search);
    },
    //clear({ commit }, employee: Partial<IPerson>) {
  },
};

export default searchModule;
