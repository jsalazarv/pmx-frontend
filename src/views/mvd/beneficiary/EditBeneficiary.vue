<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("beneficiary.edit.title") }}

            <span>{{
              validityRights.Vigencia
                | dateFormatted("YYYY-MM-DD", "DD/MM/YYYY")
            }}</span>
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container>
          <ValidationObserver v-slot="{ handleSubmit }" ref="form">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('beneficiary.attributes.assignmentNumber')"
                    name="assignmentNumber"
                    dense
                    outlined
                    readonly
                    :loading="isLoadingValidityRights"
                    v-model="computedEmployeeId"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('beneficiary.attributes.workerValidity')"
                    name="workerValidity"
                    dense
                    outlined
                    readonly
                    :loading="isLoadingValidityRights"
                    v-model="computedValidityFormattedHeadline"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <Alert
                  :message="alert.message"
                  :alert="alert.alert"
                  :type="alert.type"
                  @hideAlert="hideAlert"
                ></Alert>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.coding')"
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
                      :label="$t('beneficiary.attributes.coding')"
                      :error-messages="errors"
                      :disabled="isLoadingCodingList"
                      :loading="isLoadingCodingList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.curp')"
                    v-slot="{ errors }"
                    rules="required|min:18|max:18"
                  >
                    <v-text-field
                      clearable
                      :label="$t('beneficiary.attributes.curp')"
                      name="curp"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Persona.Curp"
                      @input="enabledValidate"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-btn
                    @click="validateCurp"
                    color="success"
                    :disabled="isDisabledValidate"
                    large
                    dense
                  >
                    {{ $t("beneficiary.labels.validate") }}
                  </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.names')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.names')"
                      name="names"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Persona.Nombres"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.lastname')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.lastname')"
                      name="lastname"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Persona.ApellidoPaterno"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.surname')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.surname')"
                      name="surname"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Persona.ApellidoMaterno"
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
                        :name="$t('beneficiary.attributes.birthday')"
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <v-text-field
                          v-model="computedBirthdayFormatted"
                          :label="$t('beneficiary.attributes.birthday')"
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
                      v-model="beneficiary.Persona.FechaNacimiento"
                      no-title
                      @input="showPickerBirthday = false"
                      locale="es"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.age')"
                    v-slot="{ errors }"
                    rules="required|max:3|numeric"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.age')"
                      name="age"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Persona.Edad"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.gender')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="gender"
                      outlined
                      v-model="beneficiary.Persona.Sexo"
                      item-text="Sigla"
                      item-value="Sigla"
                      :items="gendersList"
                      :label="$t('beneficiary.attributes.gender')"
                      :error-messages="errors"
                      :disabled="isLoadingGendersList"
                      :loading="isLoadingGendersList"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.inability')"
                    v-slot="{ errors }"
                  >
                    <v-checkbox
                      v-model="beneficiary.IndIncapacidad"
                      dense
                      outlined
                      name="inability"
                      :label="$t('beneficiary.attributes.inability')"
                      :error-messages="errors"
                    ></v-checkbox>
                  </ValidationProvider>
                </v-col>
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
                        :name="$t('beneficiary.attributes.validity')"
                        v-slot="{ errors }"
                        rules="required"
                      >
                        <v-text-field
                          v-model="computedValidityFormatted"
                          :label="$t('beneficiary.attributes.validity')"
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
                      v-model="beneficiary.Vigencia"
                      no-title
                      @input="showPickerValidity = false"
                      locale="es"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.medicalUnit')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="medicalUnit"
                      outlined
                      v-model="beneficiary.IdUMedica"
                      item-text="Nombre"
                      item-value="Id"
                      :items="medicalUnitsList"
                      :label="$t('beneficiary.attributes.medicalUnit')"
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
                    :name="$t('beneficiary.attributes.observations')"
                    v-slot="{ errors }"
                    rules="max:250"
                  >
                    <v-textarea
                      :label="$t('beneficiary.attributes.observations')"
                      name="observations"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Observaciones"
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
                    :items="addresses"
                    item-text="DomicilioDescripcion"
                    item-value="IdDomicilio"
                    :label="$t('beneficiary.attributes.address')"
                    dense
                    outlined
                    @change="existsAddress"
                    v-model="beneficiary.Domicilio.IdDomicilio"
                  >
                    <template v-slot:prepend-item>
                      <v-list-item
                        ripple
                        @mousedown.prevent
                        @click="newAddress"
                      >
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ $t("beneficiary.labels.newAddress") }}
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
                    :name="$t('beneficiary.attributes.country')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="countries"
                      :items="countries"
                      item-text="Nombre"
                      item-value="Id"
                      :label="$t('beneficiary.attributes.country')"
                      outlined
                      :disabled="isLoadingCountries"
                      :loading="isLoadingCountries"
                      @change="getStates"
                      :error-messages="errors"
                      v-model="beneficiary.Domicilio.IdPais"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.state')"
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-autocomplete
                      dense
                      name="states"
                      :items="states"
                      item-text="Nombre"
                      item-value="IdEstado"
                      :label="$t('beneficiary.attributes.state')"
                      :disabled="
                        isLoadingStates || !beneficiary.Domicilio.IdPais
                      "
                      :loading="isLoadingStates"
                      outlined
                      required
                      v-model="beneficiary.Domicilio.IdEstado"
                      @change="getMunicipalities"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.municipality')"
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
                        isLoadingMunicipalities ||
                        !beneficiary.Domicilio.IdEstado
                      "
                      :loading="isLoadingMunicipalities"
                      :label="$t('beneficiary.attributes.municipality')"
                      outlined
                      required
                      v-model="beneficiary.Domicilio.IdMunicipio"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.zipcode')"
                    v-slot="{ errors }"
                    rules="required|numeric|min:5|max:5"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.zipcode')"
                      name="zipCode"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Domicilio.CodigoPostal"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.suburb')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributessuburb')"
                      name="suburb"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Domicilio.Colonia"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.locality')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.locality')"
                      name="suburb"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Domicilio.Localidad"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.street')"
                    v-slot="{ errors }"
                    rules="required|max:150"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.street')"
                      name="street"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Domicilio.Calle"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="2">
                  <ValidationProvider
                    :name="$t('beneficiary.attributes.outdoorNumber')"
                    v-slot="{ errors }"
                    rules="required|max:5"
                  >
                    <v-text-field
                      :label="$t('beneficiary.attributes.outdoorNumber')"
                      name="outdoorNumber"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.Domicilio.NumeroExterior"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="2">
                  <v-text-field
                    :label="$t('beneficiary.attributes.interiorNumber')"
                    name="interiorNumber"
                    dense
                    outlined
                    v-model="beneficiary.Domicilio.NumeroInterior"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('beneficiary.attributes.block')"
                    name="block"
                    dense
                    outlined
                    v-model="beneficiary.Domicilio.Manzana"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row v-if="useAddress">
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('beneficiary.attributes.lot')"
                    name="lot"
                    dense
                    outlined
                    v-model="beneficiary.Domicilio.Lote"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" offset="5">
                  <v-btn
                    type="submit"
                    color="success"
                    x-large
                    dense
                    :disabled="existsBeneficiary"
                  >
                    {{ $t("beneficiary.labels.save") }}
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>
          <RenapoDialogBeneficiary
            @hideDialog="hideDialog"
            @selectPerson="selectPerson"
            :dialog="dialog"
            :existsBeneficiary="existsBeneficiary"
          />
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import moment from "moment";
import GenderService from "@/services/GenderService";
import { IGender } from "@/services/GenderService/types";
import { IMedicalUnit } from "@/services/MedicalUnitService/types";
import MedicalUnitService from "@/services/MedicalUnitService";
import CodingService from "@/services/CodingService";
import { ICoding } from "@/services/CodingService/types";
import CountryService from "@/services/CountryService";
import { ICountry } from "@/services/CountryService/types";
import {
  IBeneficiaryRequest,
  IValidityRightsResponse,
} from "@/services/BeneficiaryService/types";
import StateService from "@/services/StateService";
import MunicipalityService from "@/services/MunicipalityService";
import { IState } from "@/services/StateService/types";
import { IMunicipality } from "@/services/MunicipalityService/types";
import BeneficiaryService from "@/services/BeneficiaryService";
import AddressService from "@/services/AddressService";
import { IAddresPersonResponse } from "@/services/AddressService/types";
import Alert from "@/components/Alert.vue";
import RenapoDialogBeneficiary from "./components/RenapoDialogBeneficiary.vue";
import PersonService from "@/services/PersonService";
import { IPersonData, IPersonValidationState } from "@/store/person/types";
import { IRenapoData } from "@/services/PersonService/types";

@Component({
  components: { Alert, RenapoDialogBeneficiary },
})
export default class EditBeneficiary extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  protected addressService = new AddressService();
  protected genderService = new GenderService();
  protected medicalUnitService = new MedicalUnitService();
  protected codingService = new CodingService();
  protected stateService = new StateService();
  protected municipalityService = new MunicipalityService();
  protected countryService = new CountryService();
  protected personService = new PersonService();
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
  public isLoadingValidityRights = false;
  public showPickerBirthday: any = false;
  public showPickerValidity: any = false;
  public useAddress: any = false;
  public dialog = false;
  public existsBeneficiary = true;
  public isDisabledValidate = true;
  public addresses: Array<IAddresPersonResponse> = [];
  public alert = {
    alert: false,
    message: "",
    type: false,
  };
  public validityRights: IValidityRightsResponse = {
    GrupoPersonal: null,
    AreaPersonal: null,
    CentroDepto: null,
    DepartamentoDescripcion: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
    EstadoVigencia: false,
    TipoEmpleadoDescripcion: null,
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Curp: null,
    IdDerechohabiente: 8,
  };
  public beneficiary: IBeneficiaryRequest = {
    IdDerechohabiente: null,
    IdPersona: 0,
    IdDerTitular: null,
    IdFamiliar: null,
    IdUMedica: null,
    TipoDer: "",
    Vigencia: "",
    Estado: "",
    Observaciones: "",
    IndIncapacidad: false,
    Persona: {
      IdPersona: 0,
      Curp: "",
      Nombres: "",
      ApellidoPaterno: "",
      ApellidoMaterno: "",
      FechaNacimiento: "",
      Edad: "",
      Sexo: "",
      Rfc: "",
      EstadoCivil: "",
      IndRenapo: false,
      Fotografia: "",
      FechaFoto: "",
      Firma: "",
      SiglasEntidad: "",
      Nacionalidad: "",
      DpDocumento: 0,
      DpEntidad: 0,
      DpFoja: 0,
      DpMunicipio: 0,
      DpAnio: 0,
      DpLibro: 0,
      DpCrip: "",
      DpMigracion: 0,
      DpNatura: 0,
      DpCertifica: 0,
      Archivo: "",
      PfechaAlta: "",
      PFolioConstancia: 0,
      PEstatus: 0,
      XEstatus: "",
      YEstatus: "",
      ZEstatus: "",
      Marca: "",
      CError: 0,
      Observacion: "",
      DpActa: 0,
      DpTomo: 0,
    },
    Domicilio: {
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
  public renapoData: IRenapoData = {
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Sexo: "",
    FechaNacimiento: "",
    Nacionalidad: "",
    AnioRegistro: 0,
    IdMunicipioRegistro: 0,
    IdEntidadNacional: "",
    IdEntidadEmisora: "",
  };
  public personData: IPersonData = {
    IdPersona: 0,
    Curp: "",
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    Rfc: "",
    EstadoCivil: "",
    IndRenapo: false,
    Fotografia: "",
    FechaFoto: "",
    Firma: "",
    SiglasEntidad: "",
    Nacionalidad: "",
    DpDocumento: 0,
    DpEntidad: 0,
    DpFoja: 0,
    DpMunicipio: 0,
    DpAnio: 0,
    DpLibro: 0,
    DpCrip: "",
    DpMigracion: 0,
    DpNatura: 0,
    DpCertifica: 0,
    Archivo: "",
    PfechaAlta: "",
    PFolioConstancia: 0,
    PEstatus: 0,
    XEstatus: "",
    YEstatus: "",
    ZEstatus: "",
    Marca: "",
    CError: 0,
    Observacion: "",
    DpActa: 0,
    DpTomo: 0,
  };

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get computedIdPerson(): number {
    return Number(this.$route.params.paramIdPerson);
  }

  get computedEmployeeId(): number {
    return Number(this.$route.params.paramEmployeeId);
  }

  get computedEmployeeTypeId(): number {
    return Number(this.$route.params.paramEmployeeTypeId);
  }

  get computedBirthdayFormatted(): string | null {
    return this.formatted(this.beneficiary.Persona.FechaNacimiento);
  }

  get computedValidityFormatted(): string | null {
    return this.formatted(this.beneficiary.Vigencia);
  }

  get computedValidityFormattedHeadline(): string | null {
    return this.formatted(this.validityRights.Vigencia);
  }

  get computedPerson(): IPersonValidationState {
    return this.$store.state.person;
  }

  newAddress(): void {
    this.useAddress = true;
    this.beneficiary.Domicilio = {
      IdDomicilio: 0,
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
    };
  }

  existsAddress(): void {
    this.useAddress = false;
  }

  formatted(date: any): string | null {
    if (!date) return null;
    return moment(date).format("DD/MM/YYYY");
  }

  formatted2(date: any): string | null {
    if (!date) return null;
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
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
    if (!this.beneficiary.Domicilio.IdPais) return;
    this.isLoadingStates = true;
    this.stateService
      .getByCountryId(this.beneficiary.Domicilio.IdPais)
      .then((response) => {
        this.states = response.Data;
      })
      .finally(() => {
        this.isLoadingStates = false;
      });
  }

  getMunicipalities(): void {
    if (!this.beneficiary.Domicilio.IdEstado) return;
    this.isLoadingMunicipalities = true;
    this.municipalityService
      .getByStateId(this.beneficiary.Domicilio.IdEstado)
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

  getCoding(): void {
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

  getValidityRights(): void {
    this.isLoadingValidityRights = true;
    this.beneficiaryService
      .getValidityRights(
        this.computedIdPerson,
        this.computedEmployeeId,
        this.computedEmployeeTypeId
      )
      .then((response) => {
        this.validityRights = response.Data;
        this.beneficiary.IdDerTitular = this.validityRights.IdDerechohabiente;
      })
      .finally(() => {
        this.isLoadingValidityRights = false;
      });
  }

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
  }

  getHeadlineAddresses(): void {
    this.addressService
      .getHeadlineAddresses(this.validityRights.IdDerechohabiente)
      .then((response) => {
        this.addresses = response.Data;
      });
  }

  validateCurp(): void {
    this.hideAlert();
    this.personService
      .findByCurp(this.beneficiary.Persona.Curp)
      .then((response) => {
        let dateBirthday = this.formatted2(
          response.Data.Renapo.FechaNacimiento
        );
        this.renapoData = {
          Curp: response.Data.Renapo.Curp,
          Nombres: response.Data.Renapo.Nombres,
          ApellidoPaterno: response.Data.Renapo.ApellidoPaterno,
          ApellidoMaterno: response.Data.Renapo.ApellidoMaterno,
          Sexo: response.Data.Renapo.Sexo,
          FechaNacimiento: dateBirthday == null ? "" : dateBirthday.toString(),
          Nacionalidad: response.Data.Renapo.Nacionalidad,
          AnioRegistro: response.Data.Renapo.AnioRegistro,
          IdMunicipioRegistro: response.Data.Renapo.IdMunicipioRegistro,
          IdEntidadNacional: response.Data.Renapo.IdEntidadNacional,
          IdEntidadEmisora: response.Data.Renapo.IdEntidadEmisora,
        };
        this.setRenapoData(this.renapoData);
        if (response.Data.MFE != null) {
          this.personData = {
            IdPersona: response.Data.MFE.IdPersona,
            Curp: response.Data.MFE.Curp,
            Nombres: response.Data.MFE.Nombres,
            ApellidoPaterno: response.Data.MFE.ApellidoPaterno,
            ApellidoMaterno: response.Data.MFE.ApellidoMaterno,
            FechaNacimiento: response.Data.MFE.FechaNacimiento,
            Sexo: response.Data.MFE.Sexo,
            Rfc: "",
            EstadoCivil: "",
            IndRenapo: false,
            Fotografia: "",
            FechaFoto: response.Data.MFE.FechaFoto,
            Firma: "",
            SiglasEntidad: "",
            Nacionalidad: "",
            DpDocumento: 0,
            DpEntidad: 0,
            DpFoja: 0,
            DpMunicipio: 0,
            DpAnio: 0,
            DpLibro: 0,
            DpCrip: "",
            DpMigracion: 0,
            DpNatura: 0,
            DpCertifica: 0,
            Archivo: "",
            PfechaAlta: "",
            PFolioConstancia: 0,
            PEstatus: 0,
            XEstatus: "",
            YEstatus: "",
            ZEstatus: "",
            Marca: "",
            CError: 0,
            Observacion: "",
            DpActa: 0,
            DpTomo: 0,
          };
          this.setPersonData(this.personData);
        } else {
          this.existsBeneficiary = false;
        }
        this.dialog = true;
      })
      .catch((error) => {
        this.alert = {
          message: this.$t(
            "beneficiary.labels.dialogs.errorValidate.message"
          ) as string,
          alert: true,
          type: false,
        };
      });
  }

  setRenapoData(renapoData: IRenapoData): void {
    this.$store.dispatch("person/setRenapoData", renapoData);
  }

  setPersonData(personData: IPersonData): void {
    this.$store.dispatch("person/setPersonData", personData);
  }

  hideDialog(): void {
    this.dialog = false;
    this.isDisabledValidate = true;
    this.existsBeneficiary = true;
  }

  selectPerson(): void {
    this.beneficiary.Persona.Nombres = this.computedPerson.Renapo.Nombres;
    this.beneficiary.Persona.ApellidoPaterno =
      this.computedPerson.Renapo.ApellidoPaterno;
    this.beneficiary.Persona.ApellidoMaterno =
      this.computedPerson.Renapo.ApellidoMaterno;
    this.beneficiary.Persona.Sexo = this.computedPerson.Renapo.Sexo;
    this.beneficiary.Persona.FechaNacimiento =
      this.computedPerson.Renapo.FechaNacimiento;
    this.beneficiary.Persona.Edad = this.getAge(
      this.computedPerson.Renapo.FechaNacimiento
    ).toString();
    this.dialog = false;
  }

  getAge(dateString: string | null): number {
    if (!dateString) return 0;
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  enabledValidate(): void {
    this.beneficiary.Persona.Nombres = "";
    this.beneficiary.Persona.ApellidoPaterno = "";
    this.beneficiary.Persona.ApellidoMaterno = "";
    this.beneficiary.Persona.ApellidoMaterno = "";
    this.beneficiary.Persona.FechaNacimiento = "";
    this.beneficiary.Persona.Sexo = "";
    this.beneficiary.Persona.Edad = "";
    this.isDisabledValidate = false;
    this.existsBeneficiary = true;
    (this.$refs.form as HTMLFormElement).reset();
  }

  onSubmit(): void {
    this.beneficiaryService
      .create(this.beneficiary)
      .then((response) => {
        this.alert = {
          message: this.$t(
            "beneficiary.labels.dialogs.successCreate.message"
          ) as string,
          alert: true,
          type: true,
        };
        this.beneficiary = {
          IdDerechohabiente: null,
          IdPersona: 0,
          IdDerTitular: 8,
          IdFamiliar: null,
          IdUMedica: null,
          TipoDer: "",
          Vigencia: "",
          Estado: "",
          Observaciones: "",
          IndIncapacidad: false,
          Persona: {
            IdPersona: 0,
            Curp: "",
            Nombres: "",
            ApellidoPaterno: "",
            ApellidoMaterno: "",
            FechaNacimiento: "",
            Edad: "",
            Sexo: "",
            Rfc: "",
            EstadoCivil: "",
            IndRenapo: false,
            Fotografia: "",
            FechaFoto: "",
            Firma: "",
            SiglasEntidad: "",
            Nacionalidad: "",
            DpDocumento: 0,
            DpEntidad: 0,
            DpFoja: 0,
            DpMunicipio: 0,
            DpAnio: 0,
            DpLibro: 0,
            DpCrip: "",
            DpMigracion: 0,
            DpNatura: 0,
            DpCertifica: 0,
            Archivo: "",
            PfechaAlta: "",
            PFolioConstancia: 0,
            PEstatus: 0,
            XEstatus: "",
            YEstatus: "",
            ZEstatus: "",
            Marca: "",
            CError: 0,
            Observacion: "",
            DpActa: 0,
            DpTomo: 0,
          },
          Domicilio: {
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
        this.isDisabledValidate = true;
        this.existsBeneficiary = true;
        (this.$refs.form as HTMLFormElement).reset();
      })
      .catch((error) => {
        this.alert = {
          message: this.$t(
            "beneficiary.labels.dialogs.errorCreate.message"
          ) as string,
          alert: true,
          type: false,
        };
      });
  }

  mounted(): void {
    this.getValidityRights();
    this.getCountries();
    this.getGenders();
    this.getMedicalUnits();
    this.getCoding();
    this.getHeadlineAddresses();
  }
}
</script>

<style scoped></style>
