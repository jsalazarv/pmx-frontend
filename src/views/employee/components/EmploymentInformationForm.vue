<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            dense
            label="Referencia"
            outlined
            required
            v-model="employmentData.referencia"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            dense
            label="Empresa/Organismo solicitante"
            outlined
            required
            v-model="employmentData.empresaOrganismoSolicitante"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            dense
            label="Centro de trabajo solicitante"
            outlined
            required
            v-model="employmentData.centroDeTrabajoSolicitante"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            dense
            label="Descripción del centro de trabajo solicitante"
            outlined
            required
            v-model="employmentData.descripcionDelCentroDeTrabajoSolicitante"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            :disabled="isLoadingSyndicates"
            :loading="isLoadingSyndicates"
            :items="syndicates"
            item-text="nombre"
            item-value="idSindicato"
            dense
            label="Sindicato"
            outlined
            required
            v-model="employmentData.idSindicato"
            @change="getSyndicateSections"
            v-if="showSyndicates === true"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            :items="syndicateSections"
            item-text="nombre"
            item-value="idSeccionSindicato"
            :disabled="
              isLoadingSyndicateSections || !employmentData.idSindicato
            "
            :loading="isLoadingSyndicateSections"
            dense
            label="Sección sindical"
            outlined
            required
            v-model="employmentData.idSeccionSindical"
            v-if="showSyndicates === true"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Observaciones"
            auto-grow
            outlined
            rows="5"
            row-height="20"
            v-model="employmentData.observaciones"
          ></v-textarea>
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
        this.syndicates = response.data;
      })
      .finally(() => {
        this.isLoadingSyndicates = false;
      });
  }

  getSyndicateSections(): void {
    if (!this.employmentData.idSindicato) return;

    this.isLoadingSyndicateSections = true;
    this.syndicateSectionService
      .getBySyndicateId(this.employmentData.idSindicato)
      .then((response) => {
        this.syndicateSections = response.data;
      })
      .finally(() => {
        this.isLoadingSyndicateSections = false;
      });
  }

  @Watch("person.idTipoEmpleado")
  selectedEmployeeType(employeeTypeId: number | null): void {
    if (employeeTypeId === 0) {
      this.showSyndicates = true;
    } else {
      this.showSyndicates = false;
      this.employmentData.idSindicato = null;
      this.employmentData.idSeccionSindical = null;
    }
  }

  mounted(): void {
    this.getSyndicates();
  }
}
</script>

<style scoped></style>
