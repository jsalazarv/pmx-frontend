<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("address.address.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container>
          {{ consultationEmployee }}
          {{ address }}
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.employeeType')"
                    name="employeeType"
                    dense
                    outlined
                    v-model="address.employeeType"
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.assigmentNumber')"
                    name="assigmentNumber"
                    dense
                    outlined
                    v-model="address.assigmentNumber"
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.rc')"
                    name="rc"
                    dense
                    outlined
                    disabled
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.fullname')"
                    name="fullname"
                    dense
                    outlined
                    v-model="address.fullname"
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.address')"
                    name="address"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.country')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="countries"
                      :items="countries"
                      item-text="Nombre"
                      item-value="Id"
                      :label="$t('address.address.addressForm.country')"
                      outlined
                      :disabled="isLoadingCountries"
                      :loading="isLoadingCountries"
                      v-model="address.country"
                      @change="getStates"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.state')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="states"
                      :items="states"
                      item-text="Nombre"
                      item-value="IdEstado"
                      :label="$t('address.address.addressForm.state')"
                      :disabled="isLoadingStates || !address.country"
                      :loading="isLoadingStates"
                      outlined
                      required
                      v-model="address.state"
                      @change="getMunicipalities"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.municipality')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="municipalities"
                      :items="municipalities"
                      item-text="Nombre"
                      item-value="IdMunicipio"
                      :disabled="isLoadingMunicipalities || !address.state"
                      :loading="isLoadingMunicipalities"
                      :label="$t('address.address.addressForm.municipality')"
                      outlined
                      required
                      v-model="address.municipality"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.zipcode')"
                    v-slot="{ errors }"
                    rules="required|numeric|min:5|max:5"
                  >
                    <v-text-field
                      :label="$t('address.address.addressForm.zipcode')"
                      name="zipCode"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="address.zipcode"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.suburb')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="$t('address.address.addressForm.suburb')"
                      name="suburb"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="address.suburb"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.locality')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="$t('address.address.addressForm.locality')"
                      name="suburb"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="address.locality"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.street')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="$t('address.address.addressForm.street')"
                      name="street"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="address.street"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="2">
                  <ValidationProvider
                    :name="$t('address.address.addressForm.outdoorNumber')"
                    v-slot="{ errors }"
                    rules="required|max:5"
                  >
                    <v-text-field
                      :label="$t('address.address.addressForm.outdoorNumber')"
                      name="outdoorNumber"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="address.outdoorNumber"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="2">
                  <v-text-field
                    :label="$t('address.address.addressForm.interiorNumber')"
                    name="interiorNumber"
                    dense
                    outlined
                    v-model="address.interiorNumber"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('address.address.addressForm.block')"
                    name="block"
                    dense
                    outlined
                    v-model="address.block"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('address.address.addressForm.lot')"
                    name="lot"
                    dense
                    outlined
                    v-model="address.lot"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" offset="5">
                  <v-btn type="submit" color="success" dark x-large dense>
                    Guardar
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IConsultationState } from "@/store/consultation/types";
import CountryService from "@/services/CountryService";
import { ICountry } from "@/services/CountryService/types";
import StateService from "@/services/StateService";
import { IState } from "@/services/StateService/types";
import MunicipalityService from "@/services/MunicipalityService";
import { IMunicipality } from "@/services/MunicipalityService/types";

@Component({})
export default class Address extends Vue {
  protected countryService = new CountryService();
  protected stateService = new StateService();
  protected municipalityService = new MunicipalityService();
  public countries: Array<ICountry> = [];
  public isLoadingCountries = false;
  public states: Array<IState> = [];
  public isLoadingStates = false;
  public isLoadingMunicipalities = false;
  public municipalities: Array<IMunicipality> = [];
  public address = {
    employeeType: "",
    assigmentNumber: 0,
    rc: "",
    fullname: "",
    country: 0,
    state: 0,
    municipality: null,
    locality: null,
    zipcode: null,
    suburb: null,
    street: null,
    outdoorNumber: null,
    interiorNumber: null,
    block: null,
    lot: null,
  };

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
    if (!this.address.country) return;
    this.isLoadingStates = true;
    this.stateService
      .getByCountryId(this.address.country)
      .then((response) => {
        this.states = response.Data;
      })
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getMunicipalities(): void {
    if (!this.address.state) return;
    this.isLoadingMunicipalities = true;
    this.municipalityService
      .getByStateId(this.address.state)
      .then((response) => {
        this.municipalities = response.Data;
      })
      .finally(() => {
        this.isLoadingMunicipalities = false;
      });
  }

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  onSubmit() {
    console.log("entra");
  }

  mounted() {
    this.address.assigmentNumber =
      this.consultationEmployee.consultation.assigmentNumber == null
        ? 0
        : this.consultationEmployee.consultation.assigmentNumber;
    this.address.fullname =
      this.consultationEmployee.consultation.fullname == null
        ? ""
        : this.consultationEmployee.consultation.fullname;
    this.address.employeeType =
      this.consultationEmployee.consultation.employeeType == null
        ? ""
        : this.consultationEmployee.consultation.employeeType;

    this.getCountries();
  }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>
