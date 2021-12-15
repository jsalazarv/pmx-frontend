<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("employeeConsultationMFE.edit.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider
                    :name="$t('employee.attributes.typeOfEmployee')"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <v-autocomplete
                      dense
                      name="typeOfEmployee"
                      :items="employeeTypeList"
                      item-text="Nombre"
                      item-value="Id"
                      :label="$t('employee.attributes.typeOfEmployee')"
                      outlined
                      required
                      :loading="isLoadingEmployeeList || isLoadingEmployeeData"
                      :disabled="
                        isLoadingEmployeeList ||
                        isValidatingEmployee ||
                        isLoadingEmployeeData
                      "
                      v-model="employeeData.TipoEmpleado.Nombre"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12"></v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import EmployeeService from "@/services/EmployeeService";
import { IShowEmployee } from "@/services/EmployeeService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";

const initialEmployeeData: IShowEmployee = {
  IdEmpleado: undefined,
  Estado: "",
  TipoEmpleado: {
    Id: null,
    Nombre: "",
  },
  Persona: {
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    RFC: "",
    Curp: "",
  },
  Filiacion: {
    Referencia: "",
  },
  Sindicato: {
    Nombre: "",
  },
  SeccionSindical: {
    Nombre: "",
  },
  CentroTrabajo: {
    Empresa: "",
    Descripcion: "",
  },
};

@Component({})
export default class employeeEdit extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  public employeeData = { ...initialEmployeeData };
  public employeeTypeList: Array<IEmployeeType> = [];
  public isLoadingEmployeeList = false;
  public isLoadingEmployeeData = false;
  public isValidatingEmployee = false;

  getEmployeeTypes(): void {
    this.isLoadingEmployeeList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.Data;
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  getEmployeeById(): void {
    this.isLoadingEmployeeData = true;
    this.employeeService
      .findById(this.$route.params.id)
      .then((response) => {
        const data = Vue.filter("cleanObject")(response.Data);
        this.employeeData = { ...initialEmployeeData, ...data };
      })
      .finally(() => {
        this.isLoadingEmployeeData = false;
      });
  }

  mounted(): void {
    this.getEmployeeTypes();
    this.getEmployeeById();
  }
}
</script>

<style scoped></style>
