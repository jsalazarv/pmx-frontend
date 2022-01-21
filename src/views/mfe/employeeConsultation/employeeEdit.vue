<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("employeeConsultationMFE.edit.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <ValidationObserver ref="form">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      :name="$t('employee.attributes.typeOfEmployee')"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-autocomplete
                        class="required"
                        dense
                        name="typeOfEmployee"
                        :items="employeeTypeList"
                        item-text="Nombre"
                        item-value="Id"
                        :label="$t('employee.attributes.typeOfEmployee')"
                        outlined
                        required
                        readonly
                        :loading="
                          isLoadingEmployeeList || isLoadingEmployeeData
                        "
                        disabled
                        v-model="employeeData.TipoEmpleado.Id"
                        :error-messages="errors"
                      ></v-autocomplete>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      :name="$t('employee.attributes.curp')"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        class="required"
                        clearable
                        dense
                        name="curp"
                        :label="$t('employee.attributes.curp')"
                        outlined
                        required
                        v-model="employeeData.Persona.Curp"
                        :disabled="
                          isValidatingEmployee ||
                          !enableValidationButton ||
                          isValidatingCurp
                        "
                        :loading="isValidatingEmployee || isValidatingCurp"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <v-btn
                      class="d-inline-block"
                      color="success"
                      :disabled="
                        isValidatingEmployee ||
                        !enableValidationButton ||
                        isValidatingCurp
                      "
                      :loading="isValidatingEmployee || isValidatingCurp"
                      @click="validateCurp"
                    >
                      {{ $t("employee.labels.validate") }}
                    </v-btn>
                    <v-checkbox
                      v-model="enableValidationButton"
                      hide-details
                      :label="$t('employee.labels.enable')"
                      class="shrink mt-0"
                      :disabled="isValidatingCurp"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12">
                    <ValidationProvider
                      :name="$t('employee.attributes.assignmentNumber')"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        dense
                        name="assignmentNumber"
                        :label="$t('employee.attributes.assignmentNumber')"
                        outlined
                        required
                        readonly
                        v-model="employeeData.IdEmpleado"
                        disabled
                        :loading="isValidatingEmployee"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                  <v-col cols="12">
                    <ValidationProvider
                      :name="$t('employee.attributes.assignmentNumberStatus')"
                      rules=""
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        dense
                        name="assignmentNumberStatus"
                        :label="
                          $t('employee.attributes.assignmentNumberStatus')
                        "
                        outlined
                        required
                        v-model="employeeData.Estado"
                        disabled
                        :loading="isValidatingEmployee"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.names')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    class="required"
                    dense
                    name="names"
                    disabled
                    :label="$t('employee.attributes.names')"
                    outlined
                    required
                    v-model="employeeData.Persona.Nombres"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.lastname')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    class="required"
                    dense
                    name="lastname"
                    disabled
                    :label="$t('employee.attributes.lastname')"
                    outlined
                    required
                    v-model="employeeData.Persona.ApellidoPaterno"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.surname')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    class="required"
                    dense
                    name="surname"
                    disabled
                    :label="$t('employee.attributes.surname')"
                    outlined
                    required
                    v-model="employeeData.Persona.ApellidoMaterno"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <ValidationProvider
                      :name="$t('employee.attributes.birthday')"
                      rules="required"
                      v-slot="{ errors }"
                      ref="birthday"
                    >
                      <v-text-field
                        class="required"
                        name="birthday"
                        disabled
                        :value="
                          employeeData.Persona.FechaNacimiento
                            | dateFormatted('YYYY-MM-DD', 'DD/MM/YYYY')
                        "
                        clearable
                        dense
                        outlined
                        :label="$t('employee.attributes.birthday')"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="
                          employeeData.Persona.FechaNacimiento = null
                        "
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </template>
                  <v-date-picker
                    v-model="employeeData.Persona.FechaNacimiento"
                    no-title
                    required
                    @change="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="2">
                <ValidationProvider
                  :name="$t('employee.attributes.gender')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    class="required"
                    dense
                    name="gender"
                    outlined
                    required
                    item-text="Sigla"
                    item-value="Sigla"
                    :items="gendersList"
                    disabled
                    :label="$t('employee.attributes.gender')"
                    :loading="isLoadingGendersList"
                    v-model="employeeData.Persona.Sexo"
                    :error-messages="errors"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="2">
                <ValidationProvider
                  :name="$t('employee.attributes.maritalStatus')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    class="required"
                    dense
                    name="maritalStatus"
                    outlined
                    required
                    v-model="employeeData.Persona.EstadoCivil"
                    item-text="Nombre"
                    item-value="Sigla"
                    :items="maritalStatusesList"
                    :disabled="isLoadingMaritalStatusesList"
                    :error-messages="errors"
                    :label="$t('employee.attributes.maritalStatus')"
                    :loading="isLoadingMaritalStatusesList"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.rfc')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    class="required"
                    dense
                    name="rfc"
                    :label="$t('employee.attributes.rfc')"
                    outlined
                    required
                    v-model="employeeData.Persona.RFC"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.reference')"
                  rules=""
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="reference"
                    :label="$t('employee.attributes.reference')"
                    outlined
                    required
                    v-model="employeeData.Filiacion.Referencia"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.applicantCompany')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    class="required"
                    dense
                    name="applicantCompany"
                    :label="$t('employee.attributes.applicantCompany')"
                    outlined
                    required
                    disabled
                    v-model="employeeData.CentroTrabajo.Empresa"
                    :error-messages="errors"
                    :items="companies"
                    item-text="Nombre"
                    item-value="Nombre"
                    @change="getWorkplaces"
                  >
                    ></v-autocomplete
                  >
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.applicantWorkCenter')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    class="required"
                    dense
                    disabled
                    :items="workplaces"
                    item-text="Descripcion"
                    item-value="IdCentro"
                    name="applicantWorkCenter"
                    :label="$t('employee.attributes.applicantWorkCenter')"
                    outlined
                    required
                    v-model="employeeData.CentroTrabajo.IdCentro"
                    :error-messages="errors"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.syndicate')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    class="required"
                    disabled
                    :loading="isLoadingSyndicates"
                    :items="syndicates"
                    item-text="Nombre"
                    item-value="IdSindicato"
                    dense
                    name="syndicate"
                    :label="$t('employee.attributes.syndicate')"
                    outlined
                    required
                    v-model="employeeData.Sindicato.IdSindicato"
                    v-if="showSyndicates === true"
                    :error-messages="errors"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.syndicateSection')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
                    class="required"
                    :items="syndicateSections"
                    item-text="Nombre"
                    item-value="IdSeccionSindicato"
                    disabled
                    :loading="isLoadingSyndicateSections"
                    dense
                    name="syndicateSection"
                    :label="$t('employee.attributes.syndicateSection')"
                    outlined
                    required
                    v-model="employeeData.SeccionSindical.IdSindicato"
                    v-if="showSyndicates === true"
                    :error-messages="errors"
                  ></v-autocomplete>
                </ValidationProvider>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  dense
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
            <v-btn
              color="success"
              @click="updateEmployee"
              :loading="isUpdating"
              :disabled="isUpdating || isValidatingEmployee || isValidatingCurp"
            >
              {{ $t("employeeConsultationMFE.labels.update") }}
            </v-btn>
          </v-container>
        </ValidationObserver>
      </v-card>
    </div>
    <renapo-edit-dialog
      :open.sync="isDialogOpen"
      :renapo-data="renapoData"
      :title="validationMessage"
      @onSelect="newRenapoData"
      @onCancel="resetForm"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PeopleService from "@/services/PeopleService";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import EmployeeService from "@/services/EmployeeService";
import GenderService from "@/services/GenderService";
import MaritalStatusService from "@/services/MaritalStatusService";
import CompanyService from "@/services/CompanyService";
import WorkplaceService from "@/services/WorkplaceService";
import SyndicateService from "@/services/SyndicateService";
import SyndicateSectionService from "@/services/SyndicateSectionService";
import {
  IShowEmployee,
  IUpdateEmployeeRequest,
} from "@/services/EmployeeService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { IGender } from "@/services/GenderService/types";
import { ICompany } from "@/services/CompanyService/types";
import { IWorkplace } from "@/services/WorkplaceService/types";
import { ISyndicate } from "@/services/SyndicateService/types";
import { ISyndicateSection } from "@/services/SyndicateSectionService/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";
import { IApiResponse } from "@/services/types";
import { IPersonValidationResponse } from "@/services/PeopleService/types";
import RenapoEditDialog from "@/views/mfe/employeeConsultation/components/RenapoEditDialog.vue";
import { IEmployeeForm } from "@/store/employee/types";

const initialEmployeeData: IShowEmployee = {
  IdEmpleado: undefined,
  Estado: "",
  TipoEmpleado: {
    Id: undefined,
    Nombre: "",
  },
  Persona: {
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    EstadoCivil: {
      Sigla: "",
      Nombre: "",
      Baja: false,
    },
    RFC: "",
    Curp: "",
  },
  Filiacion: {
    Referencia: "",
    Observaciones: "",
  },
  Sindicato: {
    IdSindicato: undefined,
    Nombre: "",
  },
  SeccionSindical: {
    IdSindicato: undefined,
    Nombre: "",
  },
  CentroTrabajo: {
    IdCentro: undefined,
    Empresa: "",
    Descripcion: "",
  },
};

@Component({
  components: { RenapoEditDialog },
})
export default class employeeEdit extends Vue {
  protected peopleService = new PeopleService();
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  protected genderService = new GenderService();
  protected maritalStatusService = new MaritalStatusService();
  protected companyService = new CompanyService();
  protected workplaceService = new WorkplaceService();
  protected syndicateService = new SyndicateService();
  protected syndicateSectionService = new SyndicateSectionService();
  public employeeData = { ...initialEmployeeData };
  public employeeTypeList: Array<IEmployeeType> = [];
  public gendersList: Array<IGender> = [];
  public maritalStatusesList: Array<IMaritalStatus> = [];
  public companies: Array<ICompany> = [];
  public workplaces: Array<IWorkplace> = [];
  public syndicates: Array<ISyndicate> = [];
  public syndicateSections: Array<ISyndicateSection> = [];
  public employeeValidationData: IPersonValidationResponse | null = null;
  public validationMessage: string | null = null;
  public infoSelected = false;
  public isLoadingEmployeeList = false;
  public isLoadingEmployeeData = false;
  public isLoadingGendersList = false;
  public isLoadingMaritalStatusesList = false;
  public isLoadingCompanies = false;
  public isLoadingWorkplaces = false;
  public isLoadingSyndicates = false;
  public isLoadingSyndicateSections = false;
  public isValidatingEmployee = false;
  public isValidatingCurp = false;
  public isUpdating = false;
  public showSyndicates = false;
  public menu1 = false;
  public enableValidationButton = false;
  public isDialogOpen = false;
  public currentCurp = "";

  getEmployeeTypes(): void {
    this.isLoadingEmployeeList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.Data;
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  getGenders(): void {
    this.isLoadingGendersList = true;
    this.genderService
      .getAll()
      .then((response) => {
        this.gendersList = response.Data;
      })
      .finally(() => {
        this.isLoadingGendersList = false;
      });
  }

  getMaritalStatuses(): void {
    this.isLoadingMaritalStatusesList = true;
    this.maritalStatusService
      .getAll()
      .then((response) => {
        this.maritalStatusesList = response.Data;
      })
      .finally(() => {
        this.isLoadingMaritalStatusesList = false;
      });
  }

  getCompanies(): void {
    this.isLoadingCompanies = true;
    this.companyService
      .getAll()
      .then((response) => {
        this.companies = response.Data;
      })
      .finally(() => {
        this.isLoadingCompanies = false;
      });
  }

  getWorkplaces(): void {
    this.isLoadingWorkplaces = true;
    this.workplaceService
      .getByCompanyName(this.employeeData.CentroTrabajo?.Empresa as string)
      .then((response) => {
        this.workplaces = response.Data;
      })
      .finally(() => {
        this.isLoadingWorkplaces = false;
      });
  }

  getSyndicates(): void {
    this.isLoadingSyndicates = true;
    this.syndicateService
      .getAll()
      .then((response) => {
        this.syndicates = response.Data;
      })
      .finally(() => {
        this.isLoadingSyndicates = false;
      });
  }

  getSyndicateSections(): void {
    if (!this.employeeData.SeccionSindical?.IdSindicato) return;

    this.isLoadingSyndicateSections = true;
    this.syndicateSectionService
      .getBySyndicateId(this.employeeData.SeccionSindical?.IdSindicato)
      .then((response) => {
        this.syndicateSections = response.Data;
      })
      .finally(() => {
        this.isLoadingSyndicateSections = false;
      });
  }

  getEmployeeById(): void {
    this.isLoadingEmployeeData = true;
    this.employeeService
      .findById(this.$route.params.id)
      .then((response) => {
        const data = Vue.filter("cleanObject")(response.Data);
        this.employeeData = { ...initialEmployeeData, ...data };
        this.currentCurp = data.Persona.Curp;
        this.getWorkplaces();
        this.getSyndicateSections();
        this.selectedEmployeeType(data.EstadoCivil);
      })
      .finally(() => {
        this.isLoadingEmployeeData = false;
      });
  }

  selectedEmployeeType(employeeTypeId: number | null): void {
    this.showSyndicates = employeeTypeId === 0;
  }

  async updateEmployee(): Promise<void> {
    const data = {
      IdPersona: this.employeeData.Persona?.IdPersona,
      Curp: this.employeeData.Persona?.Curp,
      Nombres: this.employeeData.Persona?.Nombres,
      ApellidoPaterno: this.employeeData.Persona?.ApellidoPaterno,
      ApellidoMaterno: this.employeeData.Persona?.ApellidoMaterno,
      FechaNacimiento: this.employeeData.Persona?.FechaNacimiento,
      Sexo: this.employeeData.Persona?.Sexo,
      EstadoCivil: this.employeeData.Persona?.EstadoCivil,
      RFC: this.employeeData.Persona?.RFC,
      Fotografia: this.employeeData.Persona?.Fotografia,
      IdSolicitudFiliacion: this.employeeData.Filiacion?.IdSolicitudFiliacion,
      IdCentro: this.employeeData.CentroTrabajo?.IdCentro,
      IdSeccionSindicato: this.employeeData.SeccionSindical?.IdSindicato,
      Referencia: this.employeeData.Filiacion?.Referencia,
      Observaciones: this.employeeData.Filiacion?.Observaciones,
      IdTipoEmpleado: this.employeeData.TipoEmpleado?.Id,
      IdEmpleado: this.employeeData.IdEmpleado,
    };
    this.isUpdating = true;
    this.employeeService
      .update(parseInt(this.$route.params.id), data as IUpdateEmployeeRequest)
      .then()
      .finally(() => {
        this.isUpdating = false;
      });
  }

  get renapoData(): Partial<IEmployeeForm> {
    return {
      Nombres: this.employeeValidationData?.Nombres,
      ApellidoPaterno: this.employeeValidationData?.ApellidoPaterno,
      ApellidoMaterno: this.employeeValidationData?.ApellidoMaterno,
      FechaNacimiento: Vue.filter("dateFormatted")(
        this.employeeValidationData?.FechaNacimiento,
        "DD/MM/YYYY",
        "YYYY-MM-DD"
      ),
      Sexo: this.employeeValidationData?.Sexo,
      Nacionalidad: this.employeeValidationData?.Nacionalidad,
    };
  }

  validateCurp(): void {
    this.isValidatingCurp = true;
    this.peopleService
      .validateCurpRenapo(this.employeeData.Persona?.Curp as string)
      .then(this.handleValidationResponse)
      .catch((error) => {
        console.log("ERROR HEADER", error.response);
      })
      .finally();
  }

  handleValidationResponse(
    response: IApiResponse<IPersonValidationResponse>
  ): void {
    this.employeeValidationData = response.Data;
    this.validationMessage = response.Message;

    this.openDialog();
  }

  openDialog(): void {
    this.isDialogOpen = true;
  }

  newRenapoData(): void {
    this.employeeData.Persona = {
      ...this.employeeData.Persona,
      ...this.renapoData,
    };

    this.isValidatingCurp = false;
    this.enableValidationButton = false;
  }

  resetForm(): void {
    this.infoSelected = false;
    this.isValidatingCurp = false;
    this.enableValidationButton = false;
    this.employeeData.Persona = {
      Curp: this.currentCurp,
    };
  }

  mounted(): void {
    this.getEmployeeTypes();
    this.getGenders();
    this.getMaritalStatuses();
    this.getCompanies();
    this.getSyndicates();
    this.getEmployeeById();
  }
}
</script>

<style scoped></style>