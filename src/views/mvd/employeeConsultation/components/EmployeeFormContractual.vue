<template>
  <v-container>
    <v-row>
      <Alert
        :message="alert.message"
        :alert="alert.alert"
        :type="alert.type"
        @hideAlert="hideAlert"
      ></Alert>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="$t('employeeConsultation.attributes.employeeType')"
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
          :label="$t('employeeConsultation.attributes.assignmentNumber')"
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
          :label="$t('employeeConsultation.attributes.groupPersonal')"
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
          :label="$t('employeeConsultation.attributes.areaPersonal')"
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
          :label="$t('employeeConsultation.attributes.fullname')"
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
          :label="$t('employeeConsultation.attributes.departmentCenter')"
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
          :label="$t('employeeConsultation.attributes.departmentDescription')"
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
          :label="$t('employeeConsultation.attributes.validity')"
          name="validity"
          dense
          outlined
          readonly
          :value="computedValidityFormatted"
          :loading="isLoadingValidityRights"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="$t('employeeConsultation.attributes.validityStatus')"
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
import moment from "moment";
import BeneficiaryService from "@/services/BeneficiaryService";
import { IValidityRightsResponse } from "@/services/BeneficiaryService/types";
import Alert from "@/components/Alert.vue";

@Component({ components: { Alert } })
export default class EmployeeFormContractual extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  public isLoadingValidityRights = false;
  public alert = {
    alert: false,
    message: "",
    type: false,
  };
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
    IdDerechohabiente: null,
    Sexo:""
  };

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get computedValidity(): string {
    return this.validityRights.EstadoVigencia
      ? `${this.$t("employeeConsultation.labels.validations.valid")}`
      : `${this.$t("employeeConsultation.labels.validations.notValid")}`;
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

  get computedValidityFormatted() {
    return this.formatted(this.validityRights.Vigencia);
  }

  formatted(date: any): string | null {
    return Vue.filter("dateFormatted")(date, "YYYY-MM-DD", "DD/MM/YYYY");
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
        if (!this.validityRights.EstadoVigencia) {
          this.alert = {
            message: this.$t(
              "employeeConsultation.labels.dialogs.info.message"
            ) as string,
            alert: true,
            type: false,
          };
        }
      })
      .finally(() => {
        this.isLoadingValidityRights = false;
      });
  }

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
  }

  mounted() {
    this.getValidityRights();
  }
}
</script>
