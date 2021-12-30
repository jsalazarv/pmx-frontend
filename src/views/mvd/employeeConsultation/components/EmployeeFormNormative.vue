<template>
  <v-container>
    <!-- {{ titularBeneficiary }} -->
    <ValidationObserver v-slot="{ handleSubmit }" ref="form">
      <form @submit.prevent="handleSubmit(onSubmit)">
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
          <v-col cols="12" sm="12" md="12">
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
          <v-col cols="120" sm="12" md="6">
            <v-autocomplete
              dense
              name="workplaces"
              :items="workplaces"
              item-text="Descripcion"
              item-value="IdCentro"
              :label="
                $t(
                  'employeeConsultation.consultation.employeeConsultationForm.workplace'
                )
              "
              outlined
              v-model="titularBeneficiary.IdCentro"
              :disabled="isLoadingWorkplaces"
              :loading="isLoadingWorkplaces"
              @change="getDepartments"
            ></v-autocomplete>
          </v-col>
          <v-col cols="120" sm="12" md="6">
            <v-autocomplete
              dense
              name="departments"
              :items="departments"
              item-text="Descripcion"
              item-value="IdDepartamento"
              :label="
                $t(
                  'employeeConsultation.consultation.employeeConsultationForm.department'
                )
              "
              outlined
              v-model="titularBeneficiary.IdDepartamento"
              :disabled="isLoadingDepartments || !titularBeneficiary.IdCentro"
            ></v-autocomplete>
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
                  :name="
                    $t(
                      'employeeConsultation.consultation.employeeConsultationForm.validity'
                    )
                  "
                  v-slot="{ errors }"
                  rules="required|validityrule"
                >
                  <v-text-field
                    v-model="computedValidityFormatted"
                    :label="
                      $t(
                        'employeeConsultation.consultation.employeeConsultationForm.validity'
                      )
                    "
                    name="validity"
                    hint="DD/MM/YYYY"
                    persistent-hint
                    readonly
                    v-on="on"
                    dense
                    outlined
                    :error-messages="errors"
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
              :label="
                $t(
                  'employeeConsultation.consultation.employeeConsultationForm.validityStatus'
                )
              "
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
              {{ $t("employeeConsultation.consultation.actionsButtons.save") }}
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
import { extend } from "vee-validate";

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
  public titularBeneficiary: ITitularBeneficiaryRequest = {
    IdPersona: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
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
    return this.formatted(this.titularBeneficiary.Vigencia);
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

  formatted(date: any): string | null {
    if (!date) return null;
    const arrayDate = date.split("-");
    return arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];
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

  getBeneficiaryByPerson(): void {
    this.beneficiaryService
      .getBeneficiaryByPerson(this.computedIdPerson)
      .then((response) => {
        console.log(response);
      });
  }

  onSubmit(): void {
    console.log("entra");
  }

  mounted(): void {
    this.getValidityRights();

    // this.getWorkplaces();
    // this.getBeneficiaryByPerson();

    extend("validityrule", (value, args: any) => {
      const valueDate = `${value.split("/")[2]}-${value.split("/")[1]}-${
        value.split("/")[0]
      } `;
      const currentDate = new Date().toDateString();
      const validityDate = new Date(valueDate).toDateString();
      if (new Date(validityDate) >= new Date(currentDate)) {
        return true;
      }
      return `{_field_} ${this.$t(
        "employeeConsultation.consultation.validations.validityRule"
      )}`;
    });
  }
}
</script>

<style scoped>
.sizeTextButton {
  font-size: 11px !important;
  width: 240px !important;
}
</style>
