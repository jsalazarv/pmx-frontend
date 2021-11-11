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
              :label="
                $t(
                  'employee.registration.registrationForm.locationForm.country'
                )
              "
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
              :label="
                $t('employee.registration.registrationForm.locationForm.state')
              "
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
              :label="
                $t(
                  'employee.registration.registrationForm.locationForm.municipality'
                )
              "
              outlined
              required
              v-model="address.IdMunicipio"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="location"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="location"
              :label="
                $t(
                  'employee.registration.registrationForm.locationForm.location'
                )
              "
              outlined
              required
              v-model="address.Localidad"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="postalCode"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="postalCode"
              :label="
                $t(
                  'employee.registration.registrationForm.locationForm.postalCode'
                )
              "
              outlined
              required
              v-model="address.CodigoPostal"
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
              dense
              name="suburb"
              :label="
                $t('employee.registration.registrationForm.locationForm.suburb')
              "
              outlined
              required
              v-model="address.Colonia"
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
              dense
              name="street"
              :label="
                $t('employee.registration.registrationForm.locationForm.street')
              "
              outlined
              required
              v-model="address.Calle"
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
              dense
              name="interiorNumber"
              :label="
                $t(
                  'employee.registration.registrationForm.locationForm.interiorNumber'
                )
              "
              outlined
              required
              v-model="address.NumeroInterior"
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
              dense
              name="exteriorNumber"
              :label="
                $t(
                  'employee.registration.registrationForm.locationForm.exteriorNumber'
                )
              "
              outlined
              required
              v-model="address.NumeroExterior"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider name="block" rules="required" v-slot="{ errors }">
            <v-text-field
              dense
              name="block"
              :label="
                $t('employee.registration.registrationForm.locationForm.block')
              "
              outlined
              required
              v-model="address.Manzana"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider name="lot" rules="required" v-slot="{ errors }">
            <v-text-field
              dense
              name="lot"
              :label="
                $t('employee.registration.registrationForm.locationForm.lot')
              "
              outlined
              required
              v-model="address.Lote"
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
import { IAddressForm } from "@/store/employee/types";
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

  get address(): IAddressForm {
    return this.$store.state.employees.address;
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
