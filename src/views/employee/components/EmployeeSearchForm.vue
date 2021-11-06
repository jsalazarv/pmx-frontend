<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                name="typeOfEmployee"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  dense
                  name="typeOfEmployee"
                  :items="employeeTypeList"
                  item-text="Id"
                  item-value="Id"
                  :label="
                    $t(
                      'employee.registration.registrationForm.peopleSearchForm.typeOfEmployee'
                    )
                  "
                  outlined
                  required
                  :loading="isLoadingEmployeeList"
                  :disabled="isLoadingEmployeeList || isValidatingEmployee"
                  v-model="employee.IdTipoEmpleado"
                  :error-messages="errors"
                ></v-autocomplete>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider
                name="curp"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  clearable
                  dense
                  name="curp"
                  :label="
                    $t(
                      'employee.registration.registrationForm.peopleSearchForm.curp'
                    )
                  "
                  outlined
                  required
                  v-model="employee.Curp"
                  :disabled="isValidatingEmployee"
                  :loading="isValidatingEmployee"
                  @click:clear="resetForm"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <v-btn
                color="success"
                @click="validateCurp"
                :disabled="isValidatingEmployee || !canValidate"
                :loading="isValidatingEmployee"
              >
                {{ $t("dictionary.validate") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
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
                      'employee.registration.registrationForm.peopleSearchForm.assignmentNumber'
                    )
                  "
                  outlined
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="6">
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
                      'employee.registration.registrationForm.peopleSearchForm.assignmentNumberStatus'
                    )
                  "
                  outlined
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider
                name="invoice"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  name="invoice"
                  :label="
                    $t(
                      'employee.registration.registrationForm.peopleSearchForm.invoice'
                    )
                  "
                  outlined
                  required
                  v-model="employmentData.Folio"
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
          </v-row>
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
                  'employee.registration.registrationForm.peopleSearchForm.names'
                )
              "
              outlined
              required
              v-model="employee.Nombres"
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
                  'employee.registration.registrationForm.peopleSearchForm.lastname'
                )
              "
              outlined
              required
              v-model="employee.ApellidoPaterno"
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
                  'employee.registration.registrationForm.peopleSearchForm.surname'
                )
              "
              outlined
              required
              v-model="employee.ApellidoMaterno"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
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
                  'employee.registration.registrationForm.peopleSearchForm.birthday'
                )
              "
              outlined
              required
              v-model="employee.FechaNacimiento"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            name="photography"
            rules="required"
            v-slot="{ errors }"
          >
            <v-file-input
              dense
              name="photography"
              :label="
                $t(
                  'employee.registration.registrationForm.peopleSearchForm.photography'
                )
              "
              prepend-icon="mdi-camera"
              outlined
              required
              :error-messages="errors"
            ></v-file-input>
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
              v-model="employee.Sexo"
              item-text="Sigla"
              item-value="Sigla"
              :items="gendersList"
              :disabled="canEditPersonalInfo || isLoadingGendersList"
              :error-messages="errors"
              :label="
                $t(
                  'employee.registration.registrationForm.peopleSearchForm.gender'
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
              v-model="employee.EdoCivil"
              item-text="Nombre"
              item-value="Sigla"
              :items="maritalStatusesList"
              :disabled="isLoadingMaritalStatusesList"
              :error-messages="errors"
              :label="
                $t(
                  'employee.registration.registrationForm.peopleSearchForm.maritalStatus'
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
                $t(
                  'employee.registration.registrationForm.peopleSearchForm.rfc'
                )
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
                          "employee.registration.registrationForm.peopleSearchForm.names"
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
                          "employee.registration.registrationForm.peopleSearchForm.lastname"
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
                          "employee.registration.registrationForm.peopleSearchForm.surname"
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
                          "employee.registration.registrationForm.peopleSearchForm.birthday"
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
                          "employee.registration.registrationForm.peopleSearchForm.gender"
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
                          "employee.registration.registrationForm.peopleSearchForm.names"
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
                          "employee.registration.registrationForm.peopleSearchForm.lastname"
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
                          "employee.registration.registrationForm.peopleSearchForm.surname"
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
                          "employee.registration.registrationForm.peopleSearchForm.birthday"
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
                          "employee.registration.registrationForm.peopleSearchForm.gender"
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
import EmployeeService from "@/services/EmployeeService";
import GenderService from "@/services/GenderService";
import MaritalStatusService from "@/services/MaritalStatusService";
import { IEmployeeValidationResponse } from "@/services/EmployeeService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { IEmploymentDataForm, IEmployeeForm } from "@/store/employee/types";
import { IGender } from "@/services/GenderService/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";
import { ISnackbarProps } from "@/components/types";

@Component({})
export default class EmployeeSearchForm extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  protected genderService = new GenderService();
  protected maritalStatusService = new MaritalStatusService();
  public employeeTypeList: Array<IEmployeeType> = [];
  public gendersList: Array<IGender> = [];
  public maritalStatusesList: Array<IMaritalStatus> = [];
  public employeeValidationData: IEmployeeValidationResponse | null = null;
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

  get employee(): IEmployeeForm {
    return this.$store.state.employees.employee;
  }

  get employmentData(): IEmploymentDataForm {
    return this.$store.state.employees.employmentData;
  }

  get dataTypesOfEmployee(): IEmployeeType {
    return this.$store.state.employees.typesOfEmployees;
  }

  get mfeData(): Partial<IEmployeeForm> {
    return {
      Nombres: this.employeeValidationData?.MFE?.Nombres,
      ApellidoPaterno: this.employeeValidationData?.MFE?.ApellidoPaterno,
      ApellidoMaterno: this.employeeValidationData?.MFE?.ApellidoMaterno,
      FechaNacimiento: this.employeeValidationData?.MFE?.FechaNacimiento,
      Sexo: this.employeeValidationData?.MFE?.Sexo,
    };
  }

  get renapoData(): Partial<IEmployeeForm> {
    return {
      Nombres: this.employeeValidationData?.Renapo?.Nombres,
      ApellidoPaterno: this.employeeValidationData?.Renapo?.ApellidoPaterno,
      ApellidoMaterno: this.employeeValidationData?.Renapo?.ApellidoMaterno,
      FechaNacimiento: this.employeeValidationData?.Renapo?.FechaNacimiento,
      Sexo: this.employeeValidationData?.Renapo?.Sexo,
    };
  }

  get canEditPersonalInfo(): boolean {
    return this.infoSelected;
  }

  get canValidate(): number | boolean {
    return this.employee.IdTipoEmpleado !== null && this.employee.Curp?.length;
  }

  validateCurp(): void {
    this.isValidatingEmployee = true;
    this.employeeService
      .findByCurp(this.employee.Curp, this.employee.IdTipoEmpleado)
      .then((response) => {
        this.employeeValidationData = response.Data;
        this.openDialog();
      })
      .catch((error) => {
        if (error.response.data.success === false) {
          this.showSnackbar(true, error.response.data.message, "error");
          this.infoSelected = false;
          const { Curp, IdTipoEmpleado } = this.employee;
          this.$store.dispatch("employees/clear", {
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
    this.$store.dispatch("employees/setEmployeeData", this.renapoData);
    this.closeDialog();
    this.employeeValidationData = null;
    this.infoSelected = true;
  }

  selectDataMFE(): void {
    this.$store.dispatch("employees/setEmployeeData", this.mfeData);
    this.closeDialog();
    this.employeeValidationData = null;
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
    this.$store.dispatch("employees/clear");
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
