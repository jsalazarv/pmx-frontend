import {Module} from "vuex";
import {IEmpleado, IStoreEmpleados} from "@/store/people/types";
import {AxiosResponse} from "axios";
import RenapoPeopleService from "@/services/RenapoPeopleService";

const estadoInicial: IStoreEmpleados = {
    isLoading: false,
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
        idEntidadEmisora: ""
    }
};

const peopleStore: Module<IStoreEmpleados, any> = {
    namespaced: true,
    state: {...estadoInicial},

    mutations: {
        SET_EMPLEADO(state, empleado: IEmpleado) {
            state.empleado = empleado;
        },
        IS_LOADING(state, isLoading: boolean) {
            state.isLoading = isLoading;
        }
    },

    actions: {
        getEmpleadoPorCurp({commit}, curp: string) {
            const renapoService = new RenapoPeopleService();
            commit("IS_LOADING", true);
            renapoService
                .find(curp.trim(), {})
                .then((response: AxiosResponse) => {
                    commit("SET_EMPLEADO", response.data.data.renapo);
                })
                .finally(() => {
                    commit("IS_LOADING", false);
                });
        }
    }
}

export default peopleStore;