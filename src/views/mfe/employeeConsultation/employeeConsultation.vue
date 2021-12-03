<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employeeConsultationMFE.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary">
            {{ $t("employeeConsultationMFE.labels.export") }}
          </v-btn>
          <v-btn class="mx-1" color="success" :to="{ name: 'people:create' }">
            {{ $t("employeeConsultationMFE.labels.add") }}
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-autocomplete
                dense
                name="typeOfEmployee"
                :items="employeeTypeList"
                item-text="Nombre"
                item-value="Id"
                :label="$t('employee.attributes.typeOfEmployee')"
                outlined
                required
                :loading="isLoadingEmployeeList"
                :disabled="isLoadingEmployeeList"
              ></v-autocomplete>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="names"
                :disabled="isLoadingEmployeeList"
                :label="$t('employee.attributes.names')"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                clearable
                dense
                name="curp"
                :label="$t('employee.attributes.curp')"
                outlined
                required
                :disabled="isLoadingEmployeeList"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="lastname"
                :disabled="isLoadingEmployeeList"
                :label="$t('employee.attributes.lastname')"
                outlined
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="assignmentNumber"
                :label="$t('employee.attributes.assignmentNumber')"
                outlined
                required
                :disabled="isLoadingEmployeeList"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="surname"
                :disabled="isLoadingEmployeeList"
                :label="$t('employee.attributes.surname')"
                outlined
                required
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-btn color="success" :disabled="isLoadingEmployeeList">
                {{ $t("employeeConsultationMFE.labels.search") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-progress-linear
          :active="isLoadingEmployeeList"
          :indeterminate="isLoadingEmployeeList"
        ></v-progress-linear>
        <v-data-table
          :items-per-page="5"
          class="elevation-1 mt-5"
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
import EmployeeTypeService from "@/services/EmployeeTypeService";
import { ICreateEmployeeResponse } from "@/services/EmployeeService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";

@Component({})
export default class EmployeeConsultation extends Vue {
  protected employeeService = new EmployeeService();
  protected employeeTypesService = new EmployeeTypeService();
  public employeeList: Array<ICreateEmployeeResponse> = [];
  public employeeTypeList: Array<IEmployeeType> = [];
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

  // getEmployeeList(): void {
  //   this.isLoadingEmployeeList = true;
  //   this.employeeService
  //     .getAll()
  //     .then((response) => {
  //       this.employeeList = response.Data;
  //     })
  //     .finally(() => {
  //       this.isLoadingEmployeeList = false;
  //     });
  // }

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

  mounted(): void {
    //this.getEmployeeList();
    this.getEmployeeTypes();
  }
}
</script>

<style scoped></style>
