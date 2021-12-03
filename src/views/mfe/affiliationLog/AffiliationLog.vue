<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("affiliationLog.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn color="primary">
            {{ $t("affiliationLog.labels.export") }}
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-autocomplete
                clearable
                @click:clear="getAffiliationLogList"
                dense
                name="typeOfEmployee"
                :items="employeeTypeList"
                item-text="Nombre"
                item-value="Id"
                :label="$t('affiliationLog.attributes.typeOfEmployee')"
                outlined
                required
                :loading="isLoadingAffiliationLogList"
                :disabled="isLoadingAffiliationLogList"
                v-model="params.IdTipoEmpleado"
              ></v-autocomplete>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                clearable
                @click:clear="getAffiliationLogList"
                dense
                name="curp"
                :label="$t('affiliationLog.attributes.curp')"
                outlined
                required
                :disabled="isLoadingAffiliationLogList"
                v-model="params.Curp"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                clearable
                @click:clear="getAffiliationLogList"
                dense
                name="assignmentNumber"
                :label="$t('affiliationLog.attributes.assignmentNumber')"
                outlined
                required
                :disabled="isLoadingAffiliationLogList"
                v-model="params.IdEmpleado"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                clearable
                @click:clear="getAffiliationLogList"
                dense
                name="movementDate"
                :label="$t('affiliationLog.attributes.movementDate')"
                outlined
                required
                :disabled="isLoadingAffiliationLogList"
                v-model="params.FechaRealizacion"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-btn
                color="success"
                :disabled="
                  isLoadingAffiliationLogList ||
                  (params.IdTipoEmpleado === null &&
                    !params.Curp &&
                    !params.IdEmpleado &&
                    !params.FechaRealizacion)
                "
                @click="search"
              >
                {{ $t("affiliationLog.labels.search") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-progress-linear
          :active="isLoadingAffiliationLogList"
          :indeterminate="isLoadingAffiliationLogList"
        ></v-progress-linear>
        <v-data-table
          :items-per-page="5"
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
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import AffiliationLogService from "@/services/AffiliationLogService";
import EmployeeTypeService from "@/services/EmployeeTypeService";

@Component({})
export default class AffiliationLog extends Vue {
  protected affiliationLogService = new AffiliationLogService();
  protected employeeTypesService = new EmployeeTypeService();
  public affiliationLogList: Array<IAffiliationLog> = [];
  public employeeTypeList: Array<IEmployeeType> = [];
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
  public params = {
    IdTipoEmpleado: null,
    Curp: "",
    IdEmpleado: "",
    FechaRealizacion: "",
  };

  filters() {
    return {
      ...this.params,
    };
  }

  search(): void {
    this.isLoadingAffiliationLogList = true;
    this.affiliationLogService
      .search(this.filters())
      .then((response) => {
        this.affiliationLogList = response.Data;
      })
      .finally(() => {
        this.isLoadingAffiliationLogList = false;
      });
  }

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

  getEmployeeTypes(): void {
    this.isLoadingAffiliationLogList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.Data;
      })
      .finally(() => {
        this.isLoadingAffiliationLogList = false;
      });
  }

  mounted(): void {
    this.getAffiliationLogList();
    this.getEmployeeTypes();
  }
}
</script>

<style scoped></style>
