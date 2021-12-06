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
          <ValidationObserver v-slot="{ handleSubmit }" ref="form">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-text-field
                    :label="$t('address.address.addressForm.employeeType')"
                    name="employeeType"
                    dense
                    outlined
                    :value="consultationEmployee.consultation.employeeType"
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
                    :value="consultationEmployee.consultation.assigmentNumber"
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
                    :value="consultationEmployee.consultation.rc"
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
                    :value="consultationEmployee.consultation.fullname"
                    disabled
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <v-autocomplete
                    dense
                    name="address"
                    :items="selectAddresses"
                    item-text="street"
                    item-value="idAddress"
                    :label="$t('address.address.addressForm.address')"
                    outlined
                    :disabled="isLoadingAddress"
                    :loading="isLoadingAddress"
                    v-model="address.IdDomicilio"
                    @change="getAddressById"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <v-row>
                <alert
                  :message="alert.message"
                  :alert="alert.alert"
                  :type="alert.type"
                  @hideAlert="hideAlert"
                ></alert>
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
import { IConsultationState } from "@/store/consultation/types";
import CountryService from "@/services/CountryService";
import { ICountry } from "@/services/CountryService/types";
import StateService from "@/services/StateService";
import { IState } from "@/services/StateService/types";
import MunicipalityService from "@/services/MunicipalityService";
import { IMunicipality } from "@/services/MunicipalityService/types";
import {
  IAddress,
  IAddressPerson,
  IAddressPersonSave,
  IAddressSelect,
} from "@/services/AddressService/types";
import AddressService from "@/services/AddressService/index";
import Alert from "@/components/Alert.vue";

@Component({
  components: { Alert },
})
export default class Address extends Vue {
  protected countryService = new CountryService();
  protected stateService = new StateService();
  protected municipalityService = new MunicipalityService();
  protected addressService = new AddressService();
  public countries: Array<ICountry> = [];
  public isLoadingCountries = false;
  public states: Array<IState> = [];
  public isLoadingStates = false;
  public isLoadingMunicipalities = false;
  public municipalities: Array<IMunicipality> = [];
  public addressesPerson: Array<IAddressPerson> = [];
  public addressPersonSave: IAddressPersonSave = {
    id_domicilio_persona: null,
    id_domicilio: null,
    id_persona: null,
    usuario_sesion: null,
    baja: null,
  };
  public alert = {
    alert: false,
    message: "",
    type: false,
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
  public selectAddresses: Array<IAddressSelect> = [];
  public isLoadingAddress = false;

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

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  getAddressById(): void {
    this.addressService
      .get(this.address.IdDomicilio)
      .then((response) => {
        this.address = response.Data;
      })
      .finally(() => {
        this.getStates();
        this.getMunicipalities();
      });
  }

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
  }

  getAddressesbyPerson(): void {
    this.isLoadingAddress = true;
    this.addressService
      .getAddressesbyPerson(this.consultationEmployee.consultation.id_person)
      .then((response) => {
        for (let i = 0; i < response.Data.length; i++) {
          const address = response.Data[i].domicilio_desc;
          const arrayAddress = address.split("|");
          const street = arrayAddress[0];
          const select = {} as IAddressSelect;
          select.street = street;
          select.idAddress = response.Data[i].id_domicilio;
          this.selectAddresses.push(select);
        }
      })
      .finally(() => {
        this.isLoadingAddress = false;
      });
  }

  onSubmit(): void {
    if (this.address.IdDomicilio == null) {
      this.addressService
        .create(this.address)
        .then((response) => {
          this.addressPersonSave.id_domicilio = response.Data.IdDomicilio;
          this.addressPersonSave.id_persona = this.consultationEmployee.consultation.id_person;
          this.addressPersonSave.usuario_sesion = 0; // TODO: Aquí va el usuario de la sesión

          this.addressService
            .createAddresPerson(this.addressPersonSave)
            .then((r) => {
              this.alert.message = this.$t(
                "address.address.messages.success"
              ) as string;
              this.alert.alert = true;
              this.alert.type = true;
              this.cleanForm();
              this.getAddressesbyPerson();
            });
        })
        .catch((error) => {
          this.alert.alert = true;
          this.alert.message = this.$t(
            "address.address.messages.error"
          ) as string;
          this.alert.type = false;
        });
    } else {
      this.addressService
        .edit(this.address)
        .then((response) => {
          this.alert.message = this.$t(
            "address.address.messages.success"
          ) as string;
          this.alert.alert = true;
          this.alert.type = true;
          this.cleanForm();
        })
        .catch((error) => {
          this.alert.alert = true;
          this.alert.message = this.$t(
            "address.address.messages.error"
          ) as string;
          this.alert.type = false;
        });
    }
  }

  cleanForm(): void {
    this.address = {
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
    (this.$refs.form as HTMLFormElement).reset();
  }

  mounted(): void {
    this.getCountries();
    this.getAddressesbyPerson();
  }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>
