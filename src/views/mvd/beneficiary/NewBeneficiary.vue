<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("beneficiary.beneficiary.title") }}
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
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="
                      $t(
                        'beneficiary.beneficiary.beneficiaryForm.assignmentNumber'
                      )
                    "
                    v-slot="{ errors }"
                    rules="required|max:8"
                  >
                    <v-text-field
                      :label="
                        $t(
                          'beneficiary.beneficiary.beneficiaryForm.assignmentNumber'
                        )
                      "
                      name="assignmentNumber"
                      dense
                      outlined
                      disabled
                      :error-messages="errors"
                      v-model="
                        consultationEmployee.consultation.assigmentNumber
                      "
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.coding')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="coding"
                      outlined
                      v-model="beneficiary.IdFamiliar"
                      item-text="Nombre"
                      item-value="Id"
                      :items="codingList"
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.coding')
                      "
                      :error-messages="errors"
                      :disabled="isLoadingCodingList"
                      :loading="isLoadingCodingList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.curp')"
                    v-slot="{ errors }"
                    rules="required|min:18|max:18"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.curp')
                      "
                      name="curp"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.curp"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-btn color="success" dark large dense>
                    {{ $t("beneficiary.beneficiary.buttons.validate") }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.names')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.names')
                      "
                      name="names"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.names"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.lastname')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.lastname')
                      "
                      name="lastname"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.lastanme"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.surname')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.surname')
                      "
                      name="surname"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.surname"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <v-menu
                    v-model="showPickerBirthday"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        :name="
                          $t('beneficiary.beneficiary.beneficiaryForm.birthday')
                        "
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <v-text-field
                          v-model="computedBirthdayFormatted"
                          :label="
                            $t(
                              'beneficiary.beneficiary.beneficiaryForm.birthday'
                            )
                          "
                          name="birthday"
                          hint="DD/MM/YYYY"
                          persistent-hint
                          readonly
                          v-on="on"
                          dense
                          outlined
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="beneficiary.birthday"
                      no-title
                      @input="showPickerBirthday = false"
                      locale="es"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.age')"
                    v-slot="{ errors }"
                    rules="required|max:3|numeric"
                  >
                    <v-text-field
                      :label="$t('beneficiary.beneficiary.beneficiaryForm.age')"
                      name="age"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.age"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.gender')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="gender"
                      outlined
                      v-model="beneficiary.gender"
                      item-text="Sigla"
                      item-value="Sigla"
                      :items="gendersList"
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.gender')
                      "
                      :error-messages="errors"
                      :disabled="isLoadingGendersList"
                      :loading="isLoadingGendersList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <v-menu
                    v-model="showPickerValidity"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        :name="
                          $t('beneficiary.beneficiary.beneficiaryForm.validity')
                        "
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <v-text-field
                          v-model="computedValidityFormatted"
                          :label="
                            $t(
                              'beneficiary.beneficiary.beneficiaryForm.validity'
                            )
                          "
                          name="validity"
                          hint="DD/MM/YYYY"
                          persistent-hint
                          readonly
                          v-on="on"
                          dense
                          outlined
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="beneficiary.validity"
                      no-title
                      @input="showPickerValidity = false"
                      locale="es"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.medicalUnit')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="medicalUnit"
                      outlined
                      v-model="beneficiary.medicalUnit"
                      item-text="Nombre"
                      item-value="Id"
                      :items="medicalUnitsList"
                      :label="
                        $t(
                          'beneficiary.beneficiary.beneficiaryForm.medicalUnit'
                        )
                      "
                      :error-messages="errors"
                      :disabled="isLoadingMedicalUnitsList"
                      :loading="isLoadingMedicalUnitsList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.observations')
                    "
                    v-slot="{ errors }"
                    rules="max:250"
                  >
                    <v-textarea
                      :label="
                        $t(
                          'beneficiary.beneficiary.beneficiaryForm.observations'
                        )
                      "
                      name="observations"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.observations"
                    >
                    </v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    :menu-props="{
                      closeOnClick: true,
                      closeOnContentClick: true,
                    }"
                    :items="items"
                    :label="
                      $t('beneficiary.beneficiary.beneficiaryForm.address')
                    "
                    dense
                    outlined
                    @change="existingAddress"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item
                        ripple
                        @mousedown.prevent
                        @click="newAddress"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{
                              $t(
                                "beneficiary.beneficiary.selectText.newAddress"
                              )
                            }}
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                    </template>
                  </v-select>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.country')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="countries"
                      :items="countries"
                      item-text="Nombre"
                      item-value="Id"
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.country')
                      "
                      outlined
                      :disabled="isLoadingCountries"
                      :loading="isLoadingCountries"
                      @change="getStates"
                      :error-messages="errors"
                      v-model="beneficiary.Address.IdPais"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.state')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="states"
                      :items="states"
                      item-text="Nombre"
                      item-value="IdEstado"
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.state')
                      "
                      :disabled="isLoadingStates || !beneficiary.Address.IdPais"
                      :loading="isLoadingStates"
                      outlined
                      required
                      v-model="beneficiary.Address.IdEstado"
                      @change="getMunicipalities"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.municipality')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="municipalities"
                      :items="municipalities"
                      item-text="Nombre"
                      item-value="IdMunicipio"
                      :disabled="
                        isLoadingMunicipalities || !beneficiary.Address.IdEstado
                      "
                      :loading="isLoadingMunicipalities"
                      :label="
                        $t(
                          'beneficiary.beneficiary.beneficiaryForm.municipality'
                        )
                      "
                      outlined
                      required
                      v-model="beneficiary.Address.IdMunicipio"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.zipcode')
                    "
                    v-slot="{ errors }"
                    rules="required|numeric|min:5|max:5"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.zipcode')
                      "
                      name="zipCode"
                      dense
                      outlined
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.suburb')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.suburb')
                      "
                      name="suburb"
                      dense
                      outlined
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.locality')
                    "
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.locality')
                      "
                      name="suburb"
                      dense
                      outlined
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.street')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.street')
                      "
                      name="street"
                      dense
                      outlined
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="2">
                  <ValidationProvider
                    :name="
                      $t(
                        'beneficiary.beneficiary.beneficiaryForm.outdoorNumber'
                      )
                    "
                    v-slot="{ errors }"
                    rules="required|max:5"
                  >
                    <v-text-field
                      :label="
                        $t(
                          'beneficiary.beneficiary.beneficiaryForm.outdoorNumber'
                        )
                      "
                      name="outdoorNumber"
                      dense
                      outlined
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="2">
                  <v-text-field
                    :label="
                      $t(
                        'beneficiary.beneficiary.beneficiaryForm.interiorNumber'
                      )
                    "
                    name="interiorNumber"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('beneficiary.beneficiary.beneficiaryForm.block')"
                    name="block"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('beneficiary.beneficiary.beneficiaryForm.lot')"
                    name="lot"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" offset="5">
                  <v-btn type="submit" color="success" dark x-large dense>
                    {{ $t("beneficiary.beneficiary.buttons.save") }}
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
import GenderService from "@/services/GenderService";
import { IGender } from "@/services/GenderService/types";
import { IMedicalUnit } from "@/services/MedicalUnitService/types";
import MedicalUnitService from "@/services/MedicalUnitService";
import CodingService from "@/services/CodingService";
import { ICoding } from "@/services/CodingService/types";
import CountryService from "@/services/CountryService";
import { ICountry } from "@/services/CountryService/types";
import { IBeneficiaryRequest } from "@/services/BeneficiaryService/types";
import StateService from "@/services/StateService";
import MunicipalityService from "@/services/MunicipalityService";
import { IState } from "@/services/StateService/types";
import { IMunicipality } from "@/services/MunicipalityService/types";

@Component({})
export default class NewBeneficiary extends Vue {
  protected genderService = new GenderService();
  protected medicalUnitService = new MedicalUnitService();
  protected codingService = new CodingService();
  protected stateService = new StateService();
  protected municipalityService = new MunicipalityService();
  protected countryService = new CountryService();
  public gendersList: Array<IGender> = [];
  public medicalUnitsList: Array<IMedicalUnit> = [];
  public codingList: Array<ICoding> = [];
  public states: Array<IState> = [];
  public countries: Array<ICountry> = [];
  public municipalities: Array<IMunicipality> = [];
  public isLoadingGendersList = false;
  public isLoadingMedicalUnitsList = false;
  public isLoadingCodingList = false;
  public isLoadingCountries = false;
  public isLoadingStates = false;
  public isLoadingMunicipalities = false;
  public showPickerBirthday: any = false;
  public showPickerValidity: any = false;
  public useAddress: any = false;
  public beneficiary: IBeneficiaryRequest = {
    IdDerechohabiente: null,
    IdPersona: null,
    IdDerTitular: null,
    IdFamiliar: null,
    IdUMedica: null,
    TipoDer: null,
    Vigencia: null,
    Estado: null,
    Observaciones: null,
    UsuarioCrea: null,
    IdCentro: null,
    IdDepartamento: null,
    FechaNacimiento: null,
    Edad: null,
    Person: {
      Curp: "",
      Nombres: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      FechaNacimiento: "",
      Sexo: "",
      Rfc: "",
      Edad: "",
    },
    Address: {
      IdDomicilio: null,
      IdPais: null,
      IdEstado: null,
      IdMunicipio: null,
      Localidad: "",
      CodigoPostal: "",
      Colonia: "",
      Calle: "",
      NumeroInterior: "",
      NumeroExterior: "",
      Manzana: "",
      Lote: "",
    },
  };
  public items: any = ["Foo", "Bar", "Fizz", "Buzz"];

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  get computedBirthdayFormatted() {
    return this.formatted(this.beneficiary.FechaNacimiento);
  }

  get computedValidityFormatted() {
    return this.formatted(this.beneficiary.Vigencia);
  }

  newAddress() {
    this.useAddress = true;
  }

  existingAddress() {
    this.useAddress = false;
  }

  formatted(date: any): string | null {
    if (!date) return null;
    const arrayDate = date.split("-");
    return arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];
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
    if (!this.beneficiary.Address.IdPais) return;
    this.isLoadingStates = true;
    this.stateService
      .getByCountryId(this.beneficiary.Address.IdPais)
      .then((response) => {
        this.states = response.Data;
      })
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getMunicipalities(): void {
    if (!this.beneficiary.Address.IdEstado) return;
    this.isLoadingMunicipalities = true;
    this.municipalityService
      .getByStateId(this.beneficiary.Address.IdEstado)
      .then((response) => {
        this.municipalities = response.Data;
      })
      .finally(() => {
        this.isLoadingMunicipalities = false;
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

  getMedicalUnits(): void {
    this.isLoadingMedicalUnitsList = true;
    this.medicalUnitService
      .getAll()
      .then((response) => {
        this.medicalUnitsList = response.Data;
      })
      .finally(() => {
        this.isLoadingMedicalUnitsList = false;
      });
  }

  getCoding() {
    this.isLoadingCodingList = true;
    this.codingService
      .getAll()
      .then((response) => {
        this.codingList = response.Data;
      })
      .finally(() => {
        this.isLoadingCodingList = false;
      });
  }

  mounted() {
    this.getCountries();
    this.getGenders();
    this.getMedicalUnits();
    this.getCoding();
  }

  onSubmit() {
    console.log("entra");
  }

  // created() {
  //   window.addEventListener("beforeunload", (event) => {
  //     console.log(event)
  //     // Cancel the event as stated by the standard. event.preventDefault(); // Chrome requires
  //     //returnValue to be set.
  //     event.returnValue = "";
  //   });
  //   window.addEventListener("unload", (event) => {
  //     console.log(event)
  //   });
  // }
}
</script>

<style scoped></style>
