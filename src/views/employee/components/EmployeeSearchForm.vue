<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <ValidationProvider
            name="typeOfEmployee"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="typeOfEmployee"
              :items="employeeTypeList"
              item-text="Nombre"
              item-value="Id"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.typeOfEmployee'
                )
              "
              outlined
              required
              :loading="isLoadingEmployeeList"
              :disabled="isLoadingEmployeeList || isValidatingEmployee"
              v-model="person.IdTipoEmpleado"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
          <ValidationProvider name="curp" rules="required" v-slot="{ errors }">
            <v-text-field
              clearable
              dense
              name="curp"
              :label="
                $t('people.registration.registrationForm.peopleSearchForm.curp')
              "
              outlined
              required
              v-model="person.Curp"
              :disabled="isValidatingEmployee"
              :loading="isValidatingEmployee"
              @click:clear="resetForm"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <v-btn
            color="success"
            @click="validateCurp"
            :disabled="isValidatingEmployee || !canValidate"
            :loading="isValidatingEmployee"
          >
            {{ $t("dictionary.validate") }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <ValidationProvider
            name="assignmentNumber"
            rules=""
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="assignmentNumber"
              disabled
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.assignmentNumber'
                )
              "
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider
            name="assignmentNumberStatus"
            rules=""
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="assignmentNumberStatus"
              disabled
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.assignmentNumberStatus'
                )
              "
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <ValidationProvider name="names" rules="required" v-slot="{ errors }">
            <v-text-field
              dense
              name="names"
              :disabled="canEditPersonalInfo"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.names'
                )
              "
              outlined
              required
              v-model="person.Nombres"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="lastname"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="lastname"
              :disabled="canEditPersonalInfo"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.lastname'
                )
              "
              outlined
              required
              v-model="person.ApellidoPaterno"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="surname"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="surname"
              :disabled="canEditPersonalInfo"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.surname'
                )
              "
              outlined
              required
              v-model="person.ApellidoMaterno"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            name="birthday"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="birthday"
              :disabled="canEditPersonalInfo"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.birthday'
                )
              "
              outlined
              required
              v-model="person.FechaNacimiento"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            name="gender"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="gender"
              outlined
              required
              v-model="person.Sexo"
              item-text="Sigla"
              item-value="Sigla"
              :items="gendersList"
              :disabled="canEditPersonalInfo || isLoadingGendersList"
              :error-messages="errors"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.gender'
                )
              "
              :loading="isLoadingGendersList"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            name="maritalStatus"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="maritalStatus"
              outlined
              required
              v-model="person.EstadoCivil"
              item-text="Nombre"
              item-value="Sigla"
              :items="maritalStatusesList"
              :disabled="isLoadingMaritalStatusesList"
              :error-messages="errors"
              :label="
                $t(
                  'people.registration.registrationForm.peopleSearchForm.maritalStatus'
                )
              "
              :loading="isLoadingMaritalStatusesList"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider name="rfc" rules="required" v-slot="{ errors }">
            <v-text-field
              dense
              name="rfc"
              :label="
                $t('people.registration.registrationForm.peopleSearchForm.rfc')
              "
              outlined
              required
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="isDialogOpen"
      persistent
      max-width="750"
      scrollable
      class="mx-2"
    >
      <v-card>
        <v-card-title class="text-h6"></v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card elevation="0" outlined>
                <v-card-title class="subheading font-weight-bold">
                  {{ $t("dictionary.mfe") }}
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.names"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.Nombres }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.lastname"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.ApellidoPaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.surname"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.ApellidoMaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.birthday"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.FechaNacimiento }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.gender"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.Sexo }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>
                  <div class="text-right">
                    <v-btn
                      color="success"
                      elevation="0"
                      @click="selectDataMFE"
                      :disabled="!mfeData.Nombres"
                    >
                      {{ $t("dictionary.toSelect") }}
                    </v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card elevation="0" outlined>
                <v-card-title class="subheading font-weight-bold">
                  {{ $t("dictionary.renapo") }}
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.names"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.Nombres }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.lastname"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.ApellidoPaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.surname"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.ApellidoMaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.birthday"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.FechaNacimiento }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      {{
                        $t(
                          "people.registration.registrationForm.peopleSearchForm.gender"
                        )
                      }}:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.Sexo }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>
                  <div class="text-right">
                    <v-btn
                      color="success"
                      elevation="0"
                      @click="selectDataRenapo"
                      :disabled="!renapoData.Nombres"
                    >
                      {{ $t("dictionary.toSelect") }}
                    </v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="closeDialog">
            {{ $t("dictionary.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar.visible" :top="true">
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="snackbar.visible = false"
        >
          {{ $t("dictionary.close") }}
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import PersonService from "@/services/PersonService";
import GenderService from "@/services/GenderService";
import MaritalStatusService from "@/services/MaritalStatusService";
import { IPersonValidationResponse } from "@/services/PersonService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { IPerson } from "@/store/people/types";
import { IGender } from "@/services/GenderService/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";
import { ISnackbarProps } from "@/components/types";

@Component({})
export default class EmployeeSearchForm extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected personService = new PersonService();
  protected genderService = new GenderService();
  protected maritalStatusService = new MaritalStatusService();
  public employeeTypeList: Array<IEmployeeType> = [];
  public gendersList: Array<IGender> = [];
  public maritalStatusesList: Array<IMaritalStatus> = [];
  public personValidationData: IPersonValidationResponse | null = null;
  public snackbar: ISnackbarProps = {
    visible: false,
    message: null,
    color: null,
  };
  public isLoadingEmployeeList = false;
  public isLoadingGendersList = false;
  public isLoadingMaritalStatusesList = false;
  public isValidatingEmployee = false;
  public isDialogOpen = false;
  public infoSelected = false;

  get person(): IPerson {
    return this.$store.state.people.person;
  }

  get dataTypesOfEmployee(): IEmployeeType {
    return this.$store.state.people.typesOfEmployees;
  }

  get mfeData(): Partial<IPerson> {
    return {
      Nombres: this.personValidationData?.Mfe?.Nombres,
      ApellidoPaterno: this.personValidationData?.Mfe?.ApellidoPaterno,
      ApellidoMaterno: this.personValidationData?.Mfe?.ApellidoMaterno,
      FechaNacimiento: this.personValidationData?.Mfe?.FechaNacimiento,
      Sexo: this.personValidationData?.Mfe?.Sexo,
    };
  }

  get renapoData(): Partial<IPerson> {
    return {
      Nombres: this.personValidationData?.Renapo?.Nombres,
      ApellidoPaterno: this.personValidationData?.Renapo?.ApellidoPaterno,
      ApellidoMaterno: this.personValidationData?.Renapo?.ApellidoMaterno,
      FechaNacimiento: this.personValidationData?.Renapo?.FechaNacimiento,
      Sexo: this.personValidationData?.Renapo?.Sexo,
    };
  }

  get canEditPersonalInfo(): boolean {
    return this.infoSelected;
  }

  get canValidate(): number | boolean {
    return this.person.IdTipoEmpleado !== null && this.person.Curp?.length;
  }

  validateCurp(): void {
    this.isValidatingEmployee = true;
    this.personService
      .findByCurp(this.person.Curp, this.person.IdTipoEmpleado)
      .then((response) => {
        this.personValidationData = response.Data;
        this.openDialog();
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          this.showSnackbar(true, error.response.data.message, "error");
          this.infoSelected = false;
          const { Curp, IdTipoEmpleado } = this.person;
          this.$store.dispatch("people/clear", {
            Curp: Curp,
            IdTipoEmpleado: IdTipoEmpleado,
          });
        }
      })
      .finally(() => {
        this.isValidatingEmployee = false;
      });
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  openDialog(): void {
    this.isDialogOpen = true;
  }

  selectDataRenapo(): void {
    this.$store.dispatch("people/setPersonData", this.renapoData);
    this.closeDialog();
    this.personValidationData = null;
    this.infoSelected = true;
  }

  selectDataMFE(): void {
    this.$store.dispatch("people/setPersonData", this.mfeData);
    this.closeDialog();
    this.personValidationData = null;
    this.infoSelected = true;
  }

  getEmployeeTypes(): void {
    this.isLoadingEmployeeList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.Data;
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
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

  getMaritalStatuses(): void {
    this.isLoadingMaritalStatusesList = true;
    this.maritalStatusService
      .getAll()
      .then((response) => {
        this.maritalStatusesList = response.Data;
      })
      .finally(() => {
        this.isLoadingMaritalStatusesList = false;
      });
  }

  showSnackbar(visible: boolean, message: string, color: string): void {
    this.snackbar.visible = visible;
    this.snackbar.message = message;
    this.snackbar.color = color;
  }

  resetForm(): void {
    this.$store.dispatch("people/clear");
    this.infoSelected = false;
  }

  mounted(): void {
    this.getEmployeeTypes();
    this.getGenders();
    this.getMaritalStatuses();
  }
}
</script>

<style scoped></style>
