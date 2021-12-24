<template>
  <div>
    <v-container>
      <v-row>
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
              v-model="employmentData.Referencia"
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
              v-model="employmentData.EmpresaOrganismoSolicitante"
              :error-messages="errors"
              :items="companies"
              item-text="Nombre"
              item-value="Nombre"
              @change="getWorkplaces"
            ></v-autocomplete>
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
              :disabled="
                isLoadingWorkplaces ||
                !employmentData.EmpresaOrganismoSolicitante
              "
              :items="workplaces"
              item-text="Descripcion"
              item-value="IdCentro"
              name="applicantWorkCenter"
              :label="$t('employee.attributes.applicantWorkCenter')"
              outlined
              required
              v-model="employmentData.IdCentro"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.syndicate')"
            rules="required_if:typeOfEmployee,0"
            v-slot="{ errors }"
            ref="syndicate"
          >
            <v-autocomplete
              :disabled="isLoadingSyndicates"
              :loading="isLoadingSyndicates"
              :items="syndicates"
              item-text="Nombre"
              item-value="IdSindicato"
              dense
              name="syndicate"
              :label="$t('employee.attributes.syndicate')"
              outlined
              required
              v-model="employmentData.IdSindicato"
              @change="getSyndicateSections"
              v-if="showSyndicates === true"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.syndicateSection')"
            rules="required_if:typeOfEmployee,0"
            v-slot="{ errors }"
            ref="syndicateSection"
          >
            <v-autocomplete
              :items="syndicateSections"
              item-text="Nombre"
              item-value="IdSeccionSindicato"
              :disabled="
                isLoadingSyndicateSections || !employmentData.IdSindicato
              "
              :loading="isLoadingSyndicateSections"
              dense
              name="syndicateSection"
              :label="$t('employee.attributes.syndicateSection')"
              outlined
              required
              v-model="employmentData.IdSeccionSindicato"
              v-if="showSyndicates === true"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider
            :name="$t('employee.attributes.observations')"
            rules=""
            v-slot="{ errors }"
          >
            <v-textarea
              :label="$t('employee.attributes.observations')"
              auto-grow
              outlined
              dense
              name="observations"
              rows="5"
              row-height="20"
              v-model="employmentData.Observaciones"
              :error-messages="errors"
            ></v-textarea>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";
import SyndicateService from "@/services/SyndicateService";
import SyndicateSectionService from "@/services/SyndicateSectionService";
import CompanyService from "@/services/CompanyService";
import WorkplaceService from "@/services/WorkplaceService";
import { Watch } from "vue-property-decorator";
import { ISyndicate } from "@/services/SyndicateService/types";
import { ISyndicateSection } from "@/services/SyndicateSectionService/types";
import { IEmploymentDataForm, IEmployeeForm } from "@/store/employee/types";
import { ICompany } from "@/services/CompanyService/types";
import { IWorkplace } from "@/services/WorkplaceService/types";
import { IValidationObserver } from "@/components/types";

@Component({})
export default class EmploymentInformationForm extends Vue {
  protected syndicateService = new SyndicateService();
  protected syndicateSectionService = new SyndicateSectionService();
  protected companyService = new CompanyService();
  protected workplaceService = new WorkplaceService();
  public syndicates: Array<ISyndicate> = [];
  public syndicateSections: Array<ISyndicateSection> = [];
  public companies: Array<ICompany> = [];
  public workplaces: Array<IWorkplace> = [];
  public isLoadingSyndicates = false;
  public isLoadingSyndicateSections = false;
  public isLoadingCompanies = false;
  public isLoadingWorkplaces = false;
  public showSyndicates = false;

  get employmentData(): IEmploymentDataForm {
    return this.$store.state.employees.employmentData;
  }

  get employee(): IEmployeeForm {
    return this.$store.state.employees.employee;
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
    if (!this.employmentData.IdSindicato) return;

    this.isLoadingSyndicateSections = true;
    this.syndicateSectionService
      .getBySyndicateId(this.employmentData.IdSindicato)
      .then((response) => {
        this.syndicateSections = response.Data;
      })
      .finally(() => {
        this.isLoadingSyndicateSections = false;
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
      .getByCompanyName(this.employmentData.EmpresaOrganismoSolicitante)
      .then((response) => {
        this.workplaces = response.Data;
      })
      .finally(() => {
        this.isLoadingWorkplaces = false;
      });
  }

  @Watch("employee.IdTipoEmpleado")
  selectedEmployeeType(employeeTypeId: number | null): void {
    if (employeeTypeId === 0) {
      this.showSyndicates = true;
      (this.$refs.syndicate as IValidationObserver).validate();
      (this.$refs.syndicateSection as IValidationObserver).validate();
    } else {
      this.showSyndicates = false;
      this.employmentData.IdSindicato = null;
      this.employmentData.IdSeccionSindicato = null;
    }
  }

  mounted(): void {
    this.getSyndicates();
    this.getCompanies();
  }
}
</script>

<style scoped></style>
