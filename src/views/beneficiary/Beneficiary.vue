<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
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
                      :value="consultationEmployee.consultation.assigmentNumber"
                      :error-messages="errors"
                      v-model="beneficiary.assigmentNumber"
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
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.coding')
                      "
                      name="coding"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.coding"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="$t('beneficiary.beneficiary.beneficiaryForm.curp')"
                    v-slot="{ errors }"
                    rules="min:18|max:18"
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
                  <v-btn color="success" dark large dense> validar </v-btn>
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
                      $t('beneficiary.beneficiary.beneficiaryForm.address')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="
                        $t('beneficiary.beneficiary.beneficiaryForm.address')
                      "
                      name="address"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.address"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('beneficiary.beneficiary.beneficiaryForm.medicalUnit')
                    "
                    v-slot="{ errors }"
                    rules="required"
                  >
                    <v-text-field
                      :label="
                        $t(
                          'beneficiary.beneficiary.beneficiaryForm.medicalUnit'
                        )
                      "
                      name="medicalUnit"
                      dense
                      outlined
                      :error-messages="errors"
                      v-model="beneficiary.medicalUnit"
                    >
                    </v-text-field>
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
import GenderService from "@/services/GenderService";
import { IGender } from "@/services/GenderService/types";

@Component({})
export default class Beneficiary extends Vue {
  protected genderService = new GenderService();
  public gendersList: Array<IGender> = [];
  public isLoadingGendersList = false;

  public showPickerBirthday: any = false;
  public showPickerValidity: any = false;
  //public selectedDate: any = null;
  public beneficiary = {
    assignmentNumber: "",
    coding: "",
    curp: "",
    names: "",
    lastanme: "",
    surname: "",
    birthday: null,
    age: "",
    gender: "",
    validity: null,
    address: "",
    medicalUnit: "",
    observations: "",
  };

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  get computedBirthdayFormatted() {
    return this.formatted(this.beneficiary.birthday);
  }

  get computedValidityFormatted() {
    return this.formatted(this.beneficiary.validity);
  }

  formatted(date: any): string | null {
    if (!date) return null;
    const arrayDate = date.split("-");
    return arrayDate[2] + "/" + arrayDate[1] + "/" + arrayDate[0];
  }

  getGenders(): void {
    this.isLoadingGendersList = true;
    this.genderService
      .getAll()
      .then((response) => {
        this.gendersList = response.Data;
        console.log(this.gendersList);
      })
      .finally(() => {
        this.isLoadingGendersList = false;
      });
  }

  mounted() {
    this.getGenders();
  }

  onSubmit() {
    console.log("entra");
  }

  // created() {
  //   window.addEventListener("beforeunload", (event) => {
  //     // Cancel the event as stated by the standard. event.preventDefault(); // Chrome requires
  //     //returnValue to be set.
  //     event.returnValue = "";
  //   });
  // }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>

<style scoped></style>
