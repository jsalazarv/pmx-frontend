<template>
  <v-dialog v-model="isDialogOpen" max-width="400">
    <v-card>
      <v-card-title class="headline">
        {{ $t("users.labels.dialogs.createUser.title") }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          autocomplete="off"
          class="required"
          dense
          name="assignmentNumber"
          :label="$t('users.attributes.assignmentNumber')"
          outlined
          required
          :disabled="isLoadingEmployeeData"
          v-model="assignmentNumber"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="light darken-1"
          text
          @click="closeDialog"
          :disabled="isLoadingEmployeeData"
        >
          {{ $t("users.labels.dialogs.createUser.actions.dismiss") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          :disabled="!assignmentNumber || isLoadingEmployeeData"
          @click="searchEmployee"
        >
          {{ $t("users.labels.dialogs.createUser.actions.search") }}
          <v-icon right dark> mdi-magnify </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import { IShowEmployee } from "@/services/EmployeeService/types";

const initialEmployeeData: IShowEmployee = {
  IdEmpleado: undefined,
  Estado: "",
  TipoEmpleado: {
    Id: undefined,
    Nombre: "",
  },
  Persona: {
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    EstadoCivil: {
      Sigla: "",
      Nombre: "",
      Baja: false,
    },
    RFC: "",
    Curp: "",
  },
  Filiacion: {
    Referencia: "",
    Observaciones: "",
  },
  Sindicato: {
    IdSindicato: undefined,
    Nombre: "",
  },
  SeccionSindical: {
    IdSindicato: undefined,
    Nombre: "",
  },
  CentroTrabajo: {
    IdCentro: undefined,
    Empresa: "",
    Descripcion: "",
  },
};

@Component
export default class UserDialog extends Vue {
  protected employeeService = new EmployeeService();

  @PropSync("open")
  public isDialogOpen!: boolean;

  @PropSync("employeeData", { default: () => ({ ...initialEmployeeData }) })
  public employeeInformation!: IShowEmployee;

  public assignmentNumber = "";
  public isLoadingEmployeeData = false;

  closeDialog(): void {
    this.assignmentNumber = "";
    this.isDialogOpen = false;
  }

  searchEmployee(): void {
    this.isLoadingEmployeeData = true;
    // this.employeeService
    //   .findById(this.assignmentNumber)
    //   .then((response) => {
    //     const data = Vue.filter("cleanObject")(response.Data);

    // this.employeeInformation = { ...initialEmployeeData, ...data };
    this.employeeInformation = { ...initialEmployeeData };
    //     this.assignmentNumber = "";
    this.isDialogOpen = false;
    //   })
    //   .catch()
    //   .finally(() => {
    //     this.isLoadingEmployeeData = false;
    //   });
  }
}
</script>

<style scoped></style>
