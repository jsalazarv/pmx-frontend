<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("affiliationLog.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
        <v-progress-linear
          :active="isLoadingAffiliationLogList"
          :indeterminate="isLoadingAffiliationLogList"
        ></v-progress-linear>
        <v-data-table
          :items-per-page="5"
          class="elevation-1"
          :headers="headers"
          :items="affiliationLogList"
        >
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IAffiliationLog } from "@/services/AffiliationLogService/types";
import AffiliationLogService from "@/services/AffiliationLogService";

@Component({})
export default class AffiliationLog extends Vue {
  protected affiliationLogService = new AffiliationLogService();
  public affiliationLogList: Array<IAffiliationLog> = [];
  public isLoadingAffiliationLogList = false;
  public headers = [
    {
      text: this.$t("affiliationLog.attributes.movementDate"),
      value: "FechaRealizacion",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.movementType"),
      value: "TipoMovimiento",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.user"),
      value: "",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.typeOfEmployee"),
      value: "TipoEmpleado",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.modifiedField"),
      value: "CamposModificados",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.dataBeforeSaving"),
      value: "DatosAnteriores",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.dataAfterSaving"),
      value: "DatosNuevos",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.reasonForCancellation"),
      value: "Motivo",
      sortable: false,
    },
    {
      text: this.$t("affiliationLog.attributes.assignmentNumber"),
      value: "IdEmpleado",
      sortable: false,
    },
  ];

  getAffiliationLogList(): void {
    this.isLoadingAffiliationLogList = true;
    this.affiliationLogService
      .getAll()
      .then((response) => {
        this.affiliationLogList = response.Data;
      })
      .finally(() => {
        this.isLoadingAffiliationLogList = false;
      });
  }

  mounted(): void {
    this.getAffiliationLogList();
  }
}
</script>

<style scoped></style>
