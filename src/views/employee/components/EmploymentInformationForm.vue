<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <ValidationProvider name="reference" rules="" v-slot="{ errors }">
            <v-text-field
              dense
              name="reference"
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.reference'
                )
              "
              outlined
              required
              v-model="employmentData.Referencia"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="applicantCompany"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="applicantCompany"
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.applicantCompany'
                )
              "
              outlined
              required
              v-model="employmentData.EmpresaOrganismoSolicitante"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="applicantWorkCenter"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="applicantWorkCenter"
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.applicantWorkCenter'
                )
              "
              outlined
              required
              v-model="employmentData.CentroDeTrabajoSolicitante"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="descriptionOfWorkCenter"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="descriptionOfWorkCenter"
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.descriptionOfWorkCenter'
                )
              "
              outlined
              required
              v-model="employmentData.DescripcionDelCentroDeTrabajoSolicitante"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="syndicate"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              :disabled="isLoadingSyndicates"
              :loading="isLoadingSyndicates"
              :items="syndicates"
              item-text="Nombre"
              item-value="IdSindicato"
              dense
              name="syndicate"
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.syndicate'
                )
              "
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
            name="syndicateSection"
            rules="required"
            v-slot="{ errors }"
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
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.syndicateSection'
                )
              "
              outlined
              required
              v-model="employmentData.IdSeccionSindical"
              v-if="showSyndicates === true"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12">
          <ValidationProvider name="observations" rules="" v-slot="{ errors }">
            <v-textarea
              :label="
                $t(
                  'people.registration.registrationForm.employmentInformationForm.observations'
                )
              "
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
import { ISyndicate } from "@/services/SyndicateService/types";
import { ISyndicateSection } from "@/services/SyndicateSectionService/types";
import { IEmploymentData, IPerson } from "@/store/people/types";
import { Watch } from "vue-property-decorator";

@Component({})
export default class EmploymentInformationForm extends Vue {
  protected syndicateService = new SyndicateService();
  protected syndicateSectionService = new SyndicateSectionService();
  public syndicates: Array<ISyndicate> = [];
  public syndicateSections: Array<ISyndicateSection> = [];
  public isLoadingSyndicates = false;
  public isLoadingSyndicateSections = false;
  public showSyndicates = false;

  get employmentData(): IEmploymentData {
    return this.$store.state.people.employmentData;
  }

  get person(): IPerson {
    return this.$store.state.people.person;
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

  @Watch("person.IdTipoEmpleado")
  selectedEmployeeType(employeeTypeId: number | null): void {
    if (employeeTypeId === 0) {
      this.showSyndicates = true;
    } else {
      this.showSyndicates = false;
      this.employmentData.IdSindicato = null;
      this.employmentData.IdSeccionSindical = null;
    }
  }

  mounted(): void {
    this.getSyndicates();
  }
}
</script>

<style scoped></style>
