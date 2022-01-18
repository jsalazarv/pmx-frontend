<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
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
          <ValidationObserver v-slot="{ handleSubmit }" ref="form">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.employeeType')"
                    name="employeeType"
                    dense
                    outlined
                    :value="validityRights.TipoEmpleadoDescripcion"
                    readonly
                    :loading="isLoadingValidityRights"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.assigmentNumber')"
                    name="assigmentNumber"
                    dense
                    outlined
                    :value="computedEmployeeId"
                    readonly
                    :loading="isLoadingValidityRights"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    :label="$t('address.address.addressForm.fullname')"
                    name="fullname"
                    dense
                    outlined
                    :value="computedFullname"
                    readonly
                    :loading="isLoadingValidityRights"
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
                      v-model="address.IdPais"
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
                      :disabled="isLoadingStates || !address.IdPais"
                      :loading="isLoadingStates"
                      outlined
                      required
                      v-model="address.IdEstado"
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
                      :disabled="isLoadingMunicipalities || !address.IdEstado"
                      :loading="isLoadingMunicipalities"
                      :label="$t('address.address.addressForm.municipality')"
                      outlined
                      required
                      v-model="address.IdMunicipio"
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
                      v-model="address.CodigoPostal"
                      :loading="isLoadingCurrentAddres"
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
                      v-model="address.Colonia"
                      :loading="isLoadingCurrentAddres"
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
                      v-model="address.Localidad"
                      :loading="isLoadingCurrentAddres"
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
                      v-model="address.Calle"
                      :loading="isLoadingCurrentAddres"
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
                      v-model="address.NumeroExterior"
                      :loading="isLoadingCurrentAddres"
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
                    v-model="address.NumeroInterior"
                    :loading="isLoadingCurrentAddres"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :label="$t('address.address.addressForm.block')"
                    name="block"
                    dense
                    outlined
                    v-model="address.Manzana"
                    :loading="isLoadingCurrentAddres"
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
                    v-model="address.Lote"
                    :loading="isLoadingCurrentAddres"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="4" offset="5">
                  <v-btn type="submit" color="success" dark x-large dense>
                    {{ $t("address.address.buttons.save") }}
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
import CountryService from "@/services/CountryService";
import { ICountry } from "@/services/CountryService/types";
import StateService from "@/services/StateService";
import { IState } from "@/services/StateService/types";
import MunicipalityService from "@/services/MunicipalityService";
import { IMunicipality } from "@/services/MunicipalityService/types";
import { IAddress } from "@/services/AddressService/types";
import AddressService from "@/services/AddressService/index";
import Alert from "@/components/Alert.vue";
import BeneficiaryService from "@/services/BeneficiaryService";
import { IValidityRightsResponse } from "@/services/BeneficiaryService/types";

@Component({
  components: { Alert },
})
export default class EditAddress extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  protected countryService = new CountryService();
  protected stateService = new StateService();
  protected municipalityService = new MunicipalityService();
  protected addressService = new AddressService();
  public countries: Array<ICountry> = [];
  public isLoadingCountries = false;
  public states: Array<IState> = [];
  public isLoadingStates = false;
  public isLoadingMunicipalities = false;
  public isLoadingValidityRights = false;
  public isLoadingCurrentAddres = false;
  public municipalities: Array<IMunicipality> = [];
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
    IdDerechohabiente:null
  };
  public address: IAddress = {
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
    Baja: false,
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

  get computedFullname(): string {
    return `${this.validityRights.Nombres} ${this.validityRights.ApellidoPaterno} ${this.validityRights.ApellidoMaterno}`;
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

  getMunicipalities(): void {
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
      })
      .finally(() => {
        this.isLoadingValidityRights = false;
      });
  }

  getCurrentAddress(): void {
    this.isLoadingCurrentAddres = true;
    this.addressService
      .getCurrentAddress(this.computedIdPerson)
      .then((response) => {
        this.address = response.Data;
      })
      .finally(() => {
        this.getStates();
        this.getMunicipalities();
        this.isLoadingCurrentAddres = false;
      });
  }

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
  }

  onSubmit(): void {
    this.addressService
      .edit(this.address)
      .then((response) => {
        this.alert = {
          message: this.$t("address.address.messages.success") as string,
          alert: true,
          type: true,
        };
      })
      .catch((error) => {
        this.alert = {
          message: this.$t("address.address.messages.error") as string,
          alert: true,
          type: false,
        };
      });
  }

  mounted(): void {
    this.getValidityRights();
    this.getCountries();
    this.getCurrentAddress();
  }
}
</script>
