<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("proofAssignment.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div>
            <v-text-field
              dense
              :label="$t('proofAssignment.labels.search')"
              clearable
              @click:clear="clear"
              single-line
              hide-details
              outlined
              v-model="assignmentNumber"
            ></v-text-field>
          </div>
          <v-divider class="mx-1" inset vertical></v-divider>
          <v-btn
            color="success"
            :disabled="!assignmentNumber"
            @click="getEmployeeById"
          >
            {{ $t("proofAssignment.labels.search") }}
          </v-btn>

          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            :disabled="!employeeData.IdEmpleado"
            @click="generateReport"
          >
            {{ $t("proofAssignment.labels.export") }}
          </v-btn>
        </v-toolbar>
        <v-progress-linear
          :active="isLoadingEmployeeData"
          :indeterminate="isLoadingEmployeeData"
        ></v-progress-linear>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-text-field
                dense
                name="typeOfEmployee"
                :label="$t('proofAssignment.attributes.typeOfEmployee')"
                outlined
                required
                readonly
                v-model="employeeData.TipoEmpleado.Nombre"
              ></v-text-field>
              <v-text-field
                dense
                name="curp"
                :label="$t('proofAssignment.attributes.curp')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.Curp"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                dense
                name="assignmentNumber"
                :label="$t('proofAssignment.attributes.assignmentNumber')"
                outlined
                required
                readonly
                v-model="employeeData.IdEmpleado"
              ></v-text-field>
              <v-text-field
                dense
                name="assignmentNumberStatus"
                :label="$t('proofAssignment.attributes.assignmentNumberStatus')"
                outlined
                required
                readonly
                v-model="employeeData.Estado"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                name="names"
                :label="$t('proofAssignment.attributes.names')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.Nombres"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                name="lastname"
                :label="$t('proofAssignment.attributes.lastname')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.ApellidoPaterno"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                name="surname"
                :label="$t('proofAssignment.attributes.surname')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.ApellidoMaterno"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                name="birthday"
                :label="$t('proofAssignment.attributes.birthday')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.FechaNacimiento"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                name="gender"
                :label="$t('proofAssignment.attributes.gender')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.Sexo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                name="rfc"
                :label="$t('proofAssignment.attributes.rfc')"
                outlined
                required
                readonly
                v-model="employeeData.Persona.RFC"
              ></v-text-field>
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
import EmployeeService from "@/services/EmployeeService";
import { IProofAssignmentReport } from "@/services/ProofAssignmentService/types";

const initialEmployeeData: IProofAssignmentReport = {
  IdEmpleado: undefined,
  Estado: "",
  TipoEmpleado: {
    Nombre: "",
  },
  Persona: {
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    RFC: "",
  },
};

@Component({})
export default class ProofAssignment extends Vue {
  protected employeeService = new EmployeeService();
  public employeeData = { ...initialEmployeeData };

  public isLoadingEmployeeData = false;
  public assignmentNumber = "";

  getEmployeeById(): void {
    this.isLoadingEmployeeData = true;
    this.employeeService
      .findById(this.assignmentNumber)
      .then((response) => {
        this.employeeData = response.Data;
      })
      .finally(() => {
        this.isLoadingEmployeeData = false;
      });
  }

  generateReport(): void {
    console.log("REPORT: ", this.employeeData);
  }

  clear(): void {
    this.employeeData = { ...initialEmployeeData };
  }
}
</script>

<style scoped></style>
