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
                        clearable
                        dense
                        name="curp"
                        :label="$t('employee.attributes.curp')"
                        outlined
                        required
                        v-model="employeeData.Persona.Curp"
                        :disabled="isValidatingEmployee"
                        :loading="isValidatingEmployee"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
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
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.gender')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-autocomplete
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
              <v-col cols="12" md="4">
                <ValidationProvider
                  :name="$t('employee.attributes.rfc')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="rfc"
                    :label="$t('employee.attributes.rfc')"
                    outlined
                    required
                    disabled
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
            <v-btn color="success" @click="updateEmployee">
              {{ $t("employeeConsultationMFE.labels.update") }}
            </v-btn>
          </v-container>
        </ValidationObserver>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import EmployeeService from "@/services/EmployeeService";
import GenderService from "@/services/GenderService";
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

@Component({})
export default class employeeEdit extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  protected genderService = new GenderService();
  protected companyService = new CompanyService();
  protected workplaceService = new WorkplaceService();
  protected syndicateService = new SyndicateService();
  protected syndicateSectionService = new SyndicateSectionService();
  public employeeData = { ...initialEmployeeData };
  public employeeTypeList: Array<IEmployeeType> = [];
  public gendersList: Array<IGender> = [];
  public companies: Array<ICompany> = [];
  public workplaces: Array<IWorkplace> = [];
  public syndicates: Array<ISyndicate> = [];
  public syndicateSections: Array<ISyndicateSection> = [];
  public isLoadingEmployeeList = false;
  public isLoadingEmployeeData = false;
  public isLoadingGendersList = false;
  public isLoadingCompanies = false;
  public isLoadingWorkplaces = false;
  public isLoadingSyndicates = false;
  public isLoadingSyndicateSections = false;
  public isValidatingEmployee = false;
  public menu1 = false;

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

        this.getWorkplaces();
        this.getSyndicateSections();
      })
      .finally(() => {
        this.isLoadingEmployeeData = false;
      });
  }

  async updateEmployee(): Promise<void> {
    const data = {
      IdPersona: this.employeeData.Persona?.IdPersona,
      Curp: this.employeeData.Persona?.Curp,
      Nombres: this.employeeData.Persona?.Nombres,
      ApellidoPaterno: this.employeeData.Persona?.ApellidoPaterno,
      ApellidoMaterno: this.employeeData.Persona?.ApellidoMaterno,
      Sexo: this.employeeData.Persona?.Sexo,
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
    this.employeeService
      .update(parseInt(this.$route.params.id), data as IUpdateEmployeeRequest)
      .then()
      .finally();
  }

  mounted(): void {
    this.getEmployeeTypes();
    this.getGenders();
    this.getCompanies();
    this.getSyndicates();
    this.getEmployeeById();
  }
}
</script>

<style scoped></style>
