<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12">
              <ValidationProvider
                :name="$t('employee.attributes.typeOfEmployee')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-autocomplete
                  dense
                  name="typeOfEmployee"
                  :items="employeeTypeList"
                  item-text="Nombre"
                  item-value="Id"
                  :label="$t('employee.attributes.typeOfEmployee')"
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
                :name="$t('employee.attributes.curp')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  clearable
                  dense
                  name="curp"
                  :label="$t('employee.attributes.curp')"
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
                {{ $t("employee.labels.validate") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-row>
            <v-col cols="12" md="6">
              <ValidationProvider
                :name="$t('employee.attributes.assignmentNumber')"
                rules=""
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  name="assignmentNumber"
                  disabled
                  :label="$t('employee.attributes.assignmentNumber')"
                  outlined
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12" md="6">
              <ValidationProvider
                :name="$t('employee.attributes.assignmentNumberStatus')"
                rules=""
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  name="assignmentNumberStatus"
                  disabled
                  :label="$t('employee.attributes.assignmentNumberStatus')"
                  outlined
                  required
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="12">
              <ValidationProvider
                :name="$t('employee.attributes.invoice')"
                rules="required"
                v-slot="{ errors }"
              >
                <v-text-field
                  dense
                  name="invoice"
                  :label="$t('employee.attributes.invoice')"
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
          <ValidationProvider
            :name="$t('employee.attributes.names')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="names"
              :disabled="canEditPersonalInfo"
              :label="$t('employee.attributes.names')"
              outlined
              required
              v-model="employee.Nombres"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.lastname')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="lastname"
              :disabled="canEditPersonalInfo"
              :label="$t('employee.attributes.lastname')"
              outlined
              required
              v-model="employee.ApellidoPaterno"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.surname')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="surname"
              :disabled="canEditPersonalInfo"
              :label="$t('employee.attributes.surname')"
              outlined
              required
              v-model="employee.ApellidoMaterno"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            :name="$t('employee.attributes.birthday')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="birthday"
              :disabled="canEditPersonalInfo"
              :label="$t('employee.attributes.birthday')"
              outlined
              required
              v-model="employee.FechaNacimiento"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            :name="$t('employee.attributes.photography')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-file-input
              dense
              name="photography"
              :label="$t('employee.attributes.photography')"
              prepend-icon="mdi-camera"
              outlined
              required
              :error-messages="errors"
            ></v-file-input>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            :name="$t('employee.attributes.gender')"
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
              :label="$t('employee.attributes.gender')"
              :loading="isLoadingGendersList"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="2">
          <ValidationProvider
            :name="$t('employee.attributes.maritalStatus')"
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
              :label="$t('employee.attributes.maritalStatus')"
              :loading="isLoadingMaritalStatusesList"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.rfc')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="rfc"
              :label="$t('employee.attributes.rfc')"
              outlined
              required
              v-model="employee.RFC"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
      </v-row>
    </v-container>

    <renapo-dialog
      :open.sync="isDialogOpen"
      :mfe-data="mfeData"
      :renapo-data="renapoData"
      :title="validationMessage"
      @onSelect="disableInputs"
      @onCancel="resetForm"
    />

    <confirm-use-existing-employee-dialog
      :open.sync="isConfirmDialogOpen"
      :mfe-data="mfeData"
      :renapo-data="renapoData"
      :title="validationMessage"
      @onConfirm="disableInputs"
      @onReject="resetForm"
    />

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
import {
  EmployeeValidationRule,
  IEmployeeValidationResponse,
  IMessage,
} from "@/services/EmployeeService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { IEmploymentDataForm, IEmployeeForm } from "@/store/employee/types";
import { IGender } from "@/services/GenderService/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";
import { ISnackbarProps } from "@/components/types";
import RenapoDialog from "@/views/mfe/employee/components/RenapoDialog.vue";
import ConfirmUseExistingEmployeeDialog from "@/views/mfe/employee/components/ConfirmUseExistingEmployeeDialog.vue";
import { IApiResponse } from "@/services/types";

@Component({
  components: { ConfirmUseExistingEmployeeDialog, RenapoDialog },
})
export default class EmployeeSearchForm extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  protected genderService = new GenderService();
  protected maritalStatusService = new MaritalStatusService();
  public employeeTypeList: Array<IEmployeeType> = [];
  public gendersList: Array<IGender> = [];
  public maritalStatusesList: Array<IMaritalStatus> = [];
  public employeeValidationData: IEmployeeValidationResponse | null = null;
  public validationMessage: string | null = null;
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
  public isConfirmDialogOpen = false;
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
      Nacionalidad: this.employeeValidationData?.MFE?.Nacionalidad,
    };
  }

  get renapoData(): Partial<IEmployeeForm> {
    return {
      Nombres: this.employeeValidationData?.Renapo?.Nombres,
      ApellidoPaterno: this.employeeValidationData?.Renapo?.ApellidoPaterno,
      ApellidoMaterno: this.employeeValidationData?.Renapo?.ApellidoMaterno,
      FechaNacimiento: this.employeeValidationData?.Renapo?.FechaNacimiento,
      Sexo: this.employeeValidationData?.Renapo?.Sexo,
      Nacionalidad: this.employeeValidationData?.Renapo?.Nacionalidad,
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
      .then(this.handleValidationResponse)
      .catch((error) => {
        if (
          error.response.data.Message.Regla ===
          EmployeeValidationRule.NO_REGISTRO_RENAPO_Y_MFE
        ) {
          this.showSnackbar(
            true,
            this.$t("employee.labels.dialogs.searchNotFound.message") as string,
            "error"
          );
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

  disableInputs(): void {
    this.employeeValidationData = null;
    this.infoSelected = true;
  }

  openDialog(): void {
    this.isDialogOpen = true;
  }

  openConfirmDialog(): void {
    this.isConfirmDialogOpen = true;
  }

  handleValidationResponse(
    response: IApiResponse<IEmployeeValidationResponse, IMessage>
  ): void {
    this.employeeValidationData = response.Data;
    this.validationMessage = response.Message.Texto;

    switch (response.Message.Regla) {
      case EmployeeValidationRule.PERSONA_TIPOS_EMPLEADO_NO_EXISTE:
        this.openDialog();
        break;
      case EmployeeValidationRule.PERSONA_OTROS_TIPO_EMPLEADO_EXISTE:
        this.openDialog();
        break;
      case EmployeeValidationRule.PERSONA_TIPO_EMPLEADO_EXISTE:
        this.openConfirmDialog();
        break;
      default:
        //TODO: default case
        break;
    }
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
