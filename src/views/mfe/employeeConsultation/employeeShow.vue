<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("employeeConsultationMFE.show.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary" :to="{ name: 'people:edit' }">
            {{ $t("employeeConsultationMFE.labels.edit") }}
          </v-btn>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    dense
                    readonly
                    :disabled="isLoadingEmployeeData"
                    :loading="isLoadingEmployeeData"
                    name="typeOfEmployee"
                    :label="$t('employee.attributes.typeOfEmployee')"
                    outlined
                    required
                    v-model="employeeData.TipoEmpleado.Nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    dense
                    readonly
                    :disabled="isLoadingEmployeeData"
                    :loading="isLoadingEmployeeData"
                    name="curp"
                    :label="$t('employee.attributes.curp')"
                    outlined
                    required
                    v-model="employeeData.Persona.Curp"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" md="6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    dense
                    readonly
                    :disabled="isLoadingEmployeeData"
                    :loading="isLoadingEmployeeData"
                    name="assignmentNumber"
                    :label="$t('employee.attributes.assignmentNumber')"
                    outlined
                    required
                    v-model="employeeData.IdEmpleado"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    dense
                    readonly
                    :disabled="isLoadingEmployeeData"
                    :loading="isLoadingEmployeeData"
                    name="assignmentNumberStatus"
                    :label="$t('employee.attributes.assignmentNumberStatus')"
                    outlined
                    required
                    v-model="employeeData.Estado"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="names"
                :label="$t('employee.attributes.names')"
                outlined
                required
                v-model="employeeData.Persona.Nombres"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="lastname"
                :label="$t('employee.attributes.lastname')"
                outlined
                required
                v-model="employeeData.Persona.ApellidoPaterno"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="surname"
                :label="$t('employee.attributes.surname')"
                outlined
                required
                v-model="employeeData.Persona.ApellidoMaterno"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="birthday"
                :label="$t('employee.attributes.birthday')"
                outlined
                required
                :value="
                  employeeData.Persona.FechaNacimiento
                    | dateFormatted('YYYY-MM-DD', 'DD/MM/YYYY')
                "
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="gender"
                :label="$t('employee.attributes.gender')"
                outlined
                required
                v-model="employeeData.Persona.Sexo"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="gender"
                :label="$t('employee.attributes.maritalStatus')"
                outlined
                required
                v-model="employeeData.Persona.EstadoCivil"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="rfc"
                :label="$t('employee.attributes.rfc')"
                outlined
                required
                v-model="employeeData.Persona.RFC"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="reference"
                :label="$t('employee.attributes.reference')"
                outlined
                required
                v-model="employeeData.Filiacion.Referencia"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="applicantCompany"
                :label="$t('employee.attributes.applicantCompany')"
                outlined
                required
                v-model="employeeData.CentroTrabajo.Empresa"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="applicantWorkCenter"
                :label="$t('employee.attributes.applicantWorkCenter')"
                outlined
                required
                v-model="employeeData.CentroTrabajo.Descripcion"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="syndicate"
                :label="$t('employee.attributes.syndicate')"
                outlined
                required
                v-model="employeeData.Sindicato.Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="syndicateSection"
                :label="$t('employee.attributes.syndicateSection')"
                outlined
                required
                v-model="employeeData.SeccionSindical.Nombre"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                dense
                readonly
                :disabled="isLoadingEmployeeData"
                :loading="isLoadingEmployeeData"
                name="observations"
                :label="$t('employee.attributes.observations')"
                auto-grow
                outlined
                rows="5"
                row-height="20"
                v-model="employeeData.Filiacion.Observaciones"
              ></v-textarea>
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
import { IShowEmployee } from "@/services/EmployeeService/types";

const initialEmployeeData: IShowEmployee = {
  IdEmpleado: undefined,
  Estado: "",
  TipoEmpleado: {
    Nombre: "",
  },
  Persona: {
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    EstadoCivil: "",
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
export default class employeeShow extends Vue {
  protected employeeService = new EmployeeService();
  public employeeData = { ...initialEmployeeData };
  public isLoadingEmployeeData = false;

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
    this.getEmployeeById();
  }
}
</script>

<style scoped></style>
