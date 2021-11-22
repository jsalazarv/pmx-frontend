<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employeeConsultationMFE.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
        <v-progress-linear
          :active="isLoadingEmployeeList"
          :indeterminate="isLoadingEmployeeList"
        ></v-progress-linear>
        <v-data-table
          :items-per-page="5"
          class="elevation-1"
          :headers="headers"
          :items="employeeList"
        >
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EmployeeService from "@/services/EmployeeService";
import { ICreateEmployeeResponse } from "@/services/EmployeeService/types";

@Component({})
export default class EmployeeConsultation extends Vue {
  protected employeeService = new EmployeeService();
  public employeeList: Array<ICreateEmployeeResponse> = [];
  public isLoadingEmployeeList = false;

  public headers = [
    {
      text: this.$t("employeeConsultationMFE.attributes.typeOfEmployee"),
      value: "TipoEmpleado.Nombre",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.names"),
      value: "Persona.Nombres",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.lastname"),
      value: "Persona.ApellidoPaterno",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.surname"),
      value: "Persona.ApellidoMaterno",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.curp"),
      value: "Persona.Curp",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.assignmentNumber"),
      value: "IdEmpleado",
      sortable: false,
    },
  ];

  getEmployeeList(): void {
    this.isLoadingEmployeeList = true;
    this.employeeService
      .getAll()
      .then((response) => {
        this.employeeList = response.Data;
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  mounted(): void {
    this.getEmployeeList();
  }
}
</script>

<style scoped></style>
