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
      employeeTypeId: null,
      areaPersonal: null,
      groupPersonal: null,
      idPerson: null,
      departmentCenter: "",
      departmentDescription: "",
      validity: "",
      validityStatus: false,
    },
  },

  mutations: {
    SET_CONSULTATION_DATA(state, params: IConsultation) {
      state.consultation.assigmentNumber = params.assigmentNumber;
      state.consultation.employeeType = params.employeeType;
      state.consultation.fullname = params.fullname;
      state.consultation.employeeTypeId = params.employeeTypeId;
      state.consultation.idPerson = params.idPerson;
      state.consultation.departmentCenter = params.departmentCenter;
      state.consultation.departmentDescription = params.departmentDescription;
      state.consultation.validity = params.validity;
      state.consultation.validityStatus = params.validityStatus;
      state.consultation.groupPersonal = params.groupPersonal;
      state.consultation.areaPersonal = params.areaPersonal;
    },
  },

  actions: {
    setConsultationData({ commit }, params: IConsultation) {
      commit("SET_CONSULTATION_DATA", params);
    },
  },
};

export default consultationStore;
