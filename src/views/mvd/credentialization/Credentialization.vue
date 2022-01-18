<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            Credencialización
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  :label="
                    $t(
                      'credentialization.credentialization.credentializationForm.employeeType'
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
                      'credentialization.credentialization.credentializationForm.assignmentNumber'
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
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  :label="
                    $t(
                      'credentialization.credentialization.credentializationForm.fullname'
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
          </v-container>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import BeneficiaryService from "@/services/BeneficiaryService";
import { IValidityRightsResponse } from "@/services/BeneficiaryService/types";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class Credentialization extends Vue {
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
    IdDerechohabiente:null
  };

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
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

  mounted(): void {
    this.getValidityRights();
  }
}
</script>
