import { Module } from "vuex";
import {
  IConsultation,
  IConsultationStore
} from "@/store/consultation/types";
import { IRootState } from "@/store/types";

const initialState: IConsultationStore = {
    consultation:{
        assigmentNumber :0
    }
};

const peopleModule: Module<IConsultationStore, IRootState> = {
  namespaced: true,
  state: { ...initialState },

  mutations: {
    SET_ASSIGMENTNUMBER_DATA(state, params: IConsultation) {
      state.consultation = { ...state.consultation, ...params };
    },
  },

  actions: {
    setAssigmentNumberData({ commit }, params: IConsultation) {
      commit("SET_ASSIGMENTNUMBER_DATA", params);
    },
    // clear({ commit }, employee: Partial<IPerson>) {
    //   commit("SET_EMPLOYEE_DATA", { ...initialState.person, ...employee });
    //   commit("SET_EMPLOYMENT_DATA", { ...initialState.employmentData });
    //   commit("SET_ADDRESS", { ...initialState.address });
    // },
  },
};

export default peopleModule;
