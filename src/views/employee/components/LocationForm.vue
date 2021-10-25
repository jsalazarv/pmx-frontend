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
              item-text="Nombre"
              item-value="Id"
              :disabled="isLoadingCountries"
              :loading="isLoadingCountries"
              label="País"
              outlined
              required
              v-model="address.IdPais"
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
              item-text="Nombre"
              item-value="IdEstado"
              :disabled="isLoadingStates || !address.IdPais"
              :loading="isLoadingStates"
              label="Estado"
              outlined
              required
              v-model="address.IdEstado"
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
              item-text="Nombre"
              item-value="IdMunicipio"
              :disabled="isLoadingMunicipalities || !address.IdEstado"
              :loading="isLoadingMunicipalities"
              label="Municipio/Localidad"
              outlined
              required
              v-model="address.IdMunicipio"
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
        this.countries = response.Data;
      })
      .finally(() => {
        this.isLoadingCountries = false;
      });
  }

  getStates(): void {
    if (!this.address.IdPais) return;
    console.log(this.address.IdPais);
    this.isLoadingStates = true;
    this.stateService
      .getByCountryId(this.address.IdPais)
      .then((response) => {
        this.states = response.Data;
      })
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getMunicipality(): void {
    if (!this.address.IdEstado) return;

    this.isLoadingMunicipalities = true;
    this.municipalityService
      .getByStateId(this.address.IdEstado)
      .then((response) => {
        this.municipalities = response.Data;
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
