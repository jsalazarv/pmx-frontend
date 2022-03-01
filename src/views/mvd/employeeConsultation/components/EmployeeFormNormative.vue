<template>
  <v-container fluid>
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(onSubmit)">
        <v-row class="mt-0">
          <v-col class="pb-0" cols="12" sm="12" md="4">
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
          <v-col class="pb-0" cols="12" sm="12" md="2">
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
          <v-col class="pb-0" cols="12" sm="12" md="6">
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
        <v-row class="mt-0">
          <v-col class="pb-0" cols="120" sm="12" md="6">
            <ValidationProvider
              :name="$t('employeeConsultation.attributes.workplace')"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                class="required"
                dense
                name="workplaces"
                :items="workplaces"
                item-text="Descripcion"
                item-value="IdCentro"
                :label="$t('employeeConsultation.attributes.workplace')"
                outlined
                v-model="titularBeneficiary.IdCentro"
                :disabled="isLoadingWorkplaces"
                :loading="isLoadingWorkplaces"
                @change="getDepartments"
                :error-messages="errors"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
          <v-col class="pb-0" cols="120" sm="12" md="6">
            <ValidationProvider
              :name="$t('employeeConsultation.attributes.department')"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
                class="required"
                dense
                name="departments"
                :items="departments"
                item-text="Descripcion"
                item-value="IdDepartamento"
                :label="$t('employeeConsultation.attributes.department')"
                outlined
                v-model="titularBeneficiary.IdDepartamento"
                :disabled="isLoadingDepartments || !titularBeneficiary.IdCentro"
                :loading="isLoadingDepartments"
                :error-messages="errors"
              ></v-autocomplete>
            </ValidationProvider>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col class="pb-0" cols="12" sm="12" md="3">
            <v-menu
              v-model="showPickerValidity"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on }">
                <ValidationProvider
                  :name="$t('employeeConsultation.attributes.validity')"
                  v-slot="{ errors }"
                  rules="required|validityrule"
                >
                  <v-text-field
                    class="required"
                    v-model="computedValidityFormatted"
                    :label="$t('employeeConsultation.attributes.validity')"
                    name="validity"
                    hint="DD/MM/YYYY"
                    persistent-hint
                    readonly
                    v-on="on"
                    dense
                    outlined
                    :error-messages="errors"
                    :loading="isLoadingValidityRights"
                  ></v-text-field>
                </ValidationProvider>
              </template>
              <v-date-picker
                no-title
                @input="showPickerValidity = false"
                locale="es"
                v-model="titularBeneficiary.Vigencia"
                :max="maxDate"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="12" md="3">
            <v-text-field
              :label="$t('employeeConsultation.attributes.validityStatus')"
              name="validityStatus"
              dense
              outlined
              disabled
              v-model="titularBeneficiary.validtyStatus"
            >
            </v-text-field>
          </v-col>
        </v-row>
        <v-row class="mt-0">
          <v-col cols="12" sm="12" md="2" offset-md="10">
            <v-btn type="submit" color="success" dark dense>
              {{ $t("employeeConsultation.labels.save") }}
              <v-icon right dark>mdi-content-save</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </ValidationObserver>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import WorkplaceService from "@/services/WorkplaceService";
import DepartmentService from "@/services/DepartmentService";
import { IDepartament } from "@/services/DepartmentService/types";
import { IWorkplace } from "@/services/WorkplaceService/types";
import BeneficiaryService from "@/services/BeneficiaryService/";
import {
  ITitularBeneficiaryRequest,
  IValidityRightsResponse,
} from "@/services/BeneficiaryService/types";

@Component({})
export default class EmployeeFormNormative extends Vue {
  protected workPlaceService = new WorkplaceService();
  protected departmentService = new DepartmentService();
  protected beneficiaryService = new BeneficiaryService();
  public isLoadingWorkplaces = false;
  public isLoadingDepartments = false;
  public isLoadingValidityRights = false;
  public workplaces: Array<IWorkplace> = [];
  public departments: Array<IDepartament> = [];
  public showPickerValidity: any = false;
  public maxDate = "9999-31-12";
  public titularBeneficiary: ITitularBeneficiaryRequest = {
    IdPersona: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
    IdEmpleado: null,
    IdTipoEmpleado: null,
    IdDerechohabiente: null,
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

  get computedValidityFormatted() {
    return Vue.filter("dateFormatted")(
      this.titularBeneficiary.Vigencia,
      "YYYY-MM-DD",
      "DD/MM/YYYY"
    );
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
          this.$store.dispatch("app/setNotify", {
            status: 400,
            text: this.$t(
              "employeeConsultation.labels.dialogs.info.message"
            ) as string,
          });
        }
        if (this.validityRights.IdDerechohabiente != null) {
          this.titularBeneficiary.IdCentro = this.validityRights.IdCentro;
          this.getDepartments();
          this.titularBeneficiary.IdDepartamento =
            this.validityRights.IdDepartamento;
          this.titularBeneficiary.Vigencia = this.validityRights.Vigencia;
        }
      })
      .finally(() => {
        this.isLoadingValidityRights = false;
      });
  }

  getWorkplaces(): void {
    this.isLoadingWorkplaces = true;
    this.workPlaceService
      .getAll()
      .then((response) => {
        this.workplaces = response.Data;
      })
      .finally(() => {
        this.isLoadingWorkplaces = false;
      });
  }

  getDepartments(): void {
    if (!this.titularBeneficiary.IdCentro) return;
    this.isLoadingDepartments = true;
    this.departmentService
      .getByWorkplace(this.titularBeneficiary.IdCentro)
      .then((response) => {
        this.departments = response.Data;
      })
      .finally(() => {
        this.isLoadingDepartments = false;
      });
  }

  onSubmit(): void {
    this.titularBeneficiary.IdEmpleado = this.computedEmployeeId;
    this.titularBeneficiary.IdTipoEmpleado = this.computedEmployeeTypeId;
    this.titularBeneficiary.IdPersona = this.computedIdPerson;
    this.titularBeneficiary.IdDerechohabiente =
      this.validityRights.IdDerechohabiente;
    this.beneficiaryService
      .createTitular(this.titularBeneficiary)
      .then((response) => {
        this.$store.dispatch("app/setNotify", {});
        this.getValidityRights();
        this.$emit("updateValidityRights");
      })
      .catch((error) => {
        this.$store.dispatch("app/setNotify", {
          status: 500,
        });
      });
  }

  mounted(): void {
    this.getValidityRights();
    this.getWorkplaces();
  }
}
</script>