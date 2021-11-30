import { IConsultation, IConsultationState } from "@/store/consultation/types";
import { Module } from "vuex";
import { IRootState } from "@/store/types";

const consultationStore: Module<IConsultationState, IRootState> = {
  namespaced: true,
  state: {
    consultation: {
      assigmentNumber: null,
      employeeType: "null",
      fullname: "",
      employeeTypeId:null,
      rc:"",
      id_person:null,
      department:"",
      departmentDescription:"",
      validity:"",
      ValidityStatus:""
    },
  },

  mutations: {
    SET_CONSULTATION_DATA(state, params: IConsultation) {
      console.log(params)
      state.consultation.assigmentNumber = params.assigmentNumber;
      state.consultation.employeeType = params.employeeType;
      state.consultation.fullname = params.fullname;
      state.consultation.employeeTypeId = params.employeeTypeId;
      state.consultation.id_person = params.id_person;
      state.consultation.department = params.department;
      state.consultation.departmentDescription = params.departmentDescription;
      state.consultation.validity = params.validity;
      state.consultation.ValidityStatus = params.ValidityStatus;
      state.consultation.rc = params.rc;
    },
  },

  actions: {
    setConsultationData({ commit }, params: IConsultation) {
      commit("SET_CONSULTATION_DATA", params);
    },
  },
};

export default consultationStore;
