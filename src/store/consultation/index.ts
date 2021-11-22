import { IConsultation, IConsultationState } from "@/store/consultation/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";

const consultationStore: Module<IConsultationState, IRootState> = {
  namespaced: true,
  state: {
    consultation: {
      assigmentNumber: null,
      employeeType: null,
      fullname: null,
      employeeTypeId:null
    },
  },

  mutations: {
    SET_CONSULTATION_DATA(state, params: IConsultation) {
      state.consultation.assigmentNumber = params.assigmentNumber;
      state.consultation.employeeType = params.employeeType;
      state.consultation.fullname = params.fullname;
      state.consultation.employeeTypeId = params.employeeTypeId;
    },
  },

  actions: {
    setConsultationData({ commit }, params: IConsultation) {
      commit("SET_CONSULTATION_DATA", params);
    },
  },
};

export default consultationStore;
