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
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(onSubmit)">
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
          <v-col cols="12" sm="12" md="12">
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
          <v-col cols="120" sm="12" md="6">
            <ValidationProvider
              :name="$t('employeeConsultation.attributes.workplace')"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
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
          <v-col cols="120" sm="12" md="6">
            <ValidationProvider
              :name="$t('employeeConsultation.attributes.department')"
              v-slot="{ errors }"
              rules="required"
            >
              <v-autocomplete
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
        <v-row>
          <v-col cols="12" sm="12" md="6">
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
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="12" sm="12" md="6">
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
        <v-row>
          <v-col cols="12" sm="12" md="4" offset-md="4">
            <v-btn
              class="sizeTextButton"
              type="submit"
              color="success"
              dark
              large
              dense
            >
              {{ $t("employeeConsultation.labels.save") }}
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
// import moment from "moment";
import WorkplaceService from "@/services/WorkplaceService";
import DepartmentService from "@/services/DepartmentService";
import { IDepartament } from "@/services/DepartmentService/types";
import { IWorkplace } from "@/services/WorkplaceService/types";
import BeneficiaryService from "@/services/BeneficiaryService/";
import {
  ITitularBeneficiaryRequest,
  IValidityRightsResponse,
} from "@/services/BeneficiaryService/types";
import Alert from "@/components/Alert.vue";

@Component({ components: { Alert } })
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
  public alert = {
    alert: false,
    message: "",
    type: false,
  };
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
          this.alert = {
            message: this.$t(
              "employeeConsultation.labels.dialogs.info.message"
            ) as string,
            alert: true,
            type: false,
          };
        }

        if (this.validityRights.IdDerechohabiente != null) {
          this.titularBeneficiary.IdCentro = this.validityRights.IdCentro;
          this.getDepartments();
          this.titularBeneficiary.IdDepartamento = this.validityRights.IdDepartamento;
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

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
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
    this.$emit("hide");
    this.titularBeneficiary.IdEmpleado = this.computedEmployeeId;
    this.titularBeneficiary.IdTipoEmpleado = this.computedEmployeeTypeId;
    this.titularBeneficiary.IdPersona = this.computedIdPerson;
    this.titularBeneficiary.IdDerechohabiente = this.validityRights.IdDerechohabiente;
    this.beneficiaryService
      .createTitular(this.titularBeneficiary)
      .then((response) => {
        this.alert = {
          message: this.$t(
            "employeeConsultation.labels.dialogs.successCreate.message"
          ) as string,
          alert: true,
          type: true,
        };
        this.getValidityRights();
        this.$emit("updateValidityRights");
      })
      .catch((error) => {
        this.alert = {
          message: this.$t(
            "employeeConsultation.labels.dialogs.errorCreate.message"
          ) as string,
          alert: true,
          type: false,
        };
      });
  }

  mounted(): void {
    this.getValidityRights();
    this.getWorkplaces();
  }
}
</script>

<style scoped>
.sizeTextButton {
  font-size: 11px !important;
  width: 240px !important;
}
</style>
