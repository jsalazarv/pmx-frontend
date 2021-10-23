<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="countries"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="countries"
              :items="countries"
              item-text="nombre"
              item-value="id"
              :disabled="isLoadingCountries"
              :loading="isLoadingCountries"
              label="País"
              outlined
              required
              v-model="address.idPais"
              @change="getStates"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="states"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="states"
              :items="states"
              item-text="nombre"
              item-value="id"
              :disabled="isLoadingStates || !address.idPais"
              :loading="isLoadingStates"
              label="Estado"
              outlined
              required
              v-model="address.idEstado"
              @change="getMunicipality"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="municipalities"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="municipalities"
              :items="municipalities"
              item-text="nombre"
              item-value="id"
              :disabled="isLoadingMunicipalities || !address.idEstado"
              :loading="isLoadingMunicipalities"
              label="Municipio/Localidad"
              outlined
              required
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="postalCode"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              dense
              name="postalCode"
              label="Código postal"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="suburb"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              dense
              name="suburb"
              label="Colonia"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="street"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              dense
              name="street"
              label="Calle"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            name="interiorNumber"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              dense
              name="interiorNumber"
              label="Núm. interior"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            name="exteriorNumber"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              clearable
              dense
              name="exteriorNumber"
              label="Núm. exterior"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider name="block" rules="required" v-slot="{ errors }">
            <v-text-field
              clearable
              dense
              name="block"
              label="Manzana"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider name="lot" rules="required" v-slot="{ errors }">
            <v-text-field
              clearable
              dense
              name="lot"
              label="Lote"
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CountryService from "@/services/CountryService";
import StateService from "@/services/StateService";
import MunicipalityService from "@/services/MunicipalityService";
import { ICountry } from "@/services/CountryService/types";
import { IState } from "@/services/StateService/types";
import { IAddress } from "@/store/people/types";
import { IMunicipality } from "@/services/MunicipalityService/types";

@Component({})
export default class LocationForm extends Vue {
  protected countryService = new CountryService();
  protected stateService = new StateService();
  protected municipalityService = new MunicipalityService();
  public countries: Array<ICountry> = [];
  public isLoadingCountries = false;
  public states: Array<IState> = [];
  public isLoadingStates = false;
  public municipalities: Array<IMunicipality> = [];
  public isLoadingMunicipalities = false;

  get address(): IAddress {
    return this.$store.state.people.address;
  }

  getCountries(): void {
    this.isLoadingCountries = true;
    this.countryService
      .getAll()
      .then((response) => {
        this.countries = response.data;
      })
      .finally(() => {
        this.isLoadingCountries = false;
      });
  }

  getStates(): void {
    if (!this.address.idPais) return;

    this.isLoadingStates = true;
    this.stateService
      .getByCountryId(this.address.idPais)
      .then((response) => {
        this.states = response.data;
      })
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getMunicipality(): void {
    if (!this.address.idEstado) return;

    this.isLoadingMunicipalities = true;
    this.municipalityService
      .getByStateId(this.address.idEstado)
      .then((response) => {
        this.municipalities = response.data;
      })
      .finally(() => {
        this.isLoadingMunicipalities = false;
      });
  }

  mounted(): void {
    this.getCountries();
  }
}
</script>

<style scoped></style>
