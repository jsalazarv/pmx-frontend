<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.employeeType'
            )
          "
          name="employeeType"
          dense
          outlined
          readonly
          :value="validityRights.TipoEmpleadoDescripcion"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.assignmentNumber'
            )
          "
          name="assignmentNumber"
          dense
          outlined
          readonly
          :value="computedEmployeeId"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="2">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.groupPersonal'
            )
          "
          name="groupPersonal"
          dense
          outlined
          readonly
          :value="validityRights.GrupoPersonal"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.areaPersonal'
            )
          "
          name="areaPersonal"
          dense
          outlined
          readonly
          :value="validityRights.AreaPersonal"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.fullname'
            )
          "
          name="fullname"
          dense
          outlined
          readonly
          :value="computedFullname"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.departmentCenter'
            )
          "
          name="departmentCenter"
          dense
          outlined
          readonly
          :value="validityRights.CentroDepto"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.departmentDescription'
            )
          "
          name="departmentDescription"
          dense
          outlined
          readonly
          :value="validityRights.DepartamentoDescripcion"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.validity'
            )
          "
          name="validity"
          dense
          outlined
          readonly
          :value="validityRights.Vigencia"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.validityStatus'
            )
          "
          name="validityStatus"
          dense
          outlined
          readonly
          :value="computedValidity"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import BeneficiaryService from "@/services/BeneficiaryService";
import { IValidityRightsResponse } from "@/services/BeneficiaryService/types";

@Component({})
export default class EmployeeFormContractual extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  public isLoadingValidityRights = false;
  public validityRights: IValidityRightsResponse = {
    GrupoPersonal: null,
    AreaPersonal: null,
    CentroDepto: null,
    DepartamentoDescripcion: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
    EstadoVigencia: false,
    TipoEmpleadoDescripcion: null,
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Curp: null,
  };

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get computedValidity(): string {
    return this.validityRights.EstadoVigencia
      ? `${this.$t(
          "employeeConsultation.consultation.employeeConsultationForm.valid"
        )}`
      : `${this.$t(
          "employeeConsultation.consultation.employeeConsultationForm.notValid"
        )}`;
  }

  get computedIdPerson(): number {
    return Number(this.$route.params.paramIdPerson);
  }

  get computedEmployeeId(): number {
    return Number(this.$route.params.paramEmployeeId);
  }

  get computedEmployeeTypeId(): number {
    return Number(this.$route.params.paramEmployeeTypeId);
  }

  get computedFullname(): string {
    return `${this.validityRights.Nombres} ${this.validityRights.ApellidoPaterno} ${this.validityRights.ApellidoMaterno}`;
  }

  getValidityRights(): void {
    this.isLoadingValidityRights = true;
    this.beneficiaryService
      .getValidityRights(
        this.computedIdPerson,
        this.computedEmployeeId,
        this.computedEmployeeTypeId
      )
      .then((response) => {
        this.validityRights = response.Data;
      })
      .finally(() => {
        this.isLoadingValidityRights = false;
      });
  }

  mounted() {
    this.getValidityRights();
  }
}
</script>
