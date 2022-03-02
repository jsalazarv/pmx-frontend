<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("credentialization.report.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container fluid>
          <v-row class="mt-0">
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                :label="$t('credentialization.attributes.employeeType')"
                name="employeeType"
                dense
                outlined
                readonly
                :value="validityRights.TipoEmpleadoDescripcion"
                :loading="isLoadingValidityRights"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                :label="$t('credentialization.attributes.assignmentNumber')"
                name="assignmentNumber"
                dense
                outlined
                readonly
                :value="computedEmployeeId"
                :loading="isLoadingValidityRights"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                :label="$t('credentialization.attributes.fullname')"
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
            <v-col cols="12" sm="12" md="9">
              dasda
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-card height="240" width="240" class="mx-auto">
                <v-navigation-drawer permanent>
                  <!-- <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="text-h6">
                        Application
                      </v-list-item-title>
                      <v-list-item-subtitle> subtext </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider></v-divider> -->

                  <v-list dense nav>
                    <v-list-item v-for="item in items" :key="item.title" link>
                      <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-navigation-drawer>
              </v-card>
            </v-col>
          </v-row>
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
  public items = [
    { title: "Seleccionar fotografía", icon: "mdi-view-dashboard" },
    { title: "Capturar fotografía", icon: "mdi-view-dashboard" },
    { title: "Seleccionar firma", icon: "mdi-view-dashboard" },
    { title: "Imprimir credencial", icon: "mdi-view-dashboard" },
    { title: "Entregar credencial", icon: "mdi-view-dashboard" },
    // { title: "Photos", icon: "mdi-image" },
    // { title: "About", icon: "mdi-help-box" },
  ];
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
    Sexo: "",
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
