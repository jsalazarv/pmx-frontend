<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
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
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
            :items="states"
            item-text="nombre"
            item-value="id"
            :disabled="isLoadingStates || !address.idPais"
            :loading="isLoadingStates"
            label="Estado"
            outlined
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
            label="Municipio/Localidad"
            outlined
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Código postal"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Colonia"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Calle"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            clearable
            dense
            label="Núm. interior"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            clearable
            dense
            label="Núm. exterior"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Manzana"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Lote"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IAddress } from "@/store/people/types";
import CountryService from "@/services/CountryService";
import { ICountry } from "@/services/CountryService/types";
import { IState } from "@/services/StateService/types";
import StateService from "@/services/StateService";

@Component({})
export default class LocationForm extends Vue {
  protected countryService = new CountryService();
  protected stateService = new StateService();
  public countries: Array<ICountry> = [];
  public isLoadingCountries = false;
  public states: Array<IState> = [];
  public isLoadingStates = false;

  get address(): IAddress {
    return this.$store.state.people.address;
  }

  getCountries(): void {
    this.isLoadingCountries = true;
    this.countryService
      .getAll()
      .then((response) => {
        this.countries = response.data.data;
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
        this.states = response.data.data;
      })
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  mounted(): void {
    this.getCountries();
  }
}
</script>

<style scoped></style>
