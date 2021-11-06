import { Module } from "vuex";
import {
  IEmployeeForm,
  IEmployeeState,
  IEmploymentDataForm,
  IAddress,
} from "@/store/employee/types";
import { IRootState } from "@/store/types";

const initialState: IEmployeeState = {
  employee: {
    IdTipoEmpleado: null,
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    RFC: "",
    EdoCivil: "",
    Fotografia: "",
  },
  employmentData: {
    Folio: "",
    Referencia: "",
    IdCentro: "",
    IdSeccionSindicato: null,
    Observaciones: "",
    EmpresaOrganismoSolicitante: "",
    CentroDeTrabajoSolicitante: "",
    DescripcionDelCentroDeTrabajoSolicitante: "",
    IdSindicato: null,
  },
  address: {
    IdPais: null,
    IdEstado: null,
    IdMunicipio: null,
    Localidad: "",
    CodigoPostal: "",
    Colonia: "",
    Calle: "",
    NumeroInterior: "",
    NumeroExterior: "",
    Manzana: "",
    Lote: "",
  },
};

const employeeModule: Module<IEmployeeState, IRootState> = {
  namespaced: true,
  state: { ...initialState },

  mutations: {
    SET_EMPLOYEE_DATA(state, employee: Partial<IEmployeeForm>) {
      state.employee = { ...state.employee, ...employee };
    },
    SET_EMPLOYMENT_DATA(state, employmentData: Partial<IEmploymentDataForm>) {
      state.employmentData = { ...state.employmentData, ...employmentData };
    },
    SET_ADDRESS(state, address: Partial<IAddress>) {
      state.address = { ...state.address, ...address };
    },
  },

  actions: {
    setEmployeeData({ commit }, employee: Partial<IEmployeeForm>) {
      commit("SET_EMPLOYEE_DATA", employee);
    },
    clear({ commit }, employee: Partial<IEmployeeForm>) {
      commit("SET_EMPLOYEE_DATA", { ...initialState.employee, ...employee });
      commit("SET_EMPLOYMENT_DATA", { ...initialState.employmentData });
      commit("SET_ADDRESS", { ...initialState.address });
    },
  },
};

export default employeeModule;
