<template>
  <v-dialog v-model="isDialogOpen" max-width="700">
    <v-card>
      <v-card-title class="headline mb-2">
        {{
          isCreated
            ? $t("users.labels.dialogs.createUser.title")
            : "Editar Usuario"
        }}
      </v-card-title>
      <v-card-text class="py-0">
        <v-row dense>
          <v-col class="py-0" cols="12" md="6">
            <v-text-field
              autocomplete="off"
              dense
              name="assignmentNumber"
              :label="$t('employee.attributes.assignmentNumber')"
              outlined
              required
              disabled
              v-model="userDataRequest.IdEmpleado"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" md="6">
            <v-autocomplete
              class="required"
              dense
              name="typeOfEmployee"
              :items="employeeTypeList"
              item-text="Nombre"
              item-value="Id"
              :label="$t('employee.attributes.typeOfEmployee')"
              outlined
              required
              :loading="isLoadingEmployeeList"
              disabled
              v-model="userDataRequest.IdTipoEmpleado"
            ></v-autocomplete>
          </v-col>
          <v-col class="py-0" cols="12" md="4">
            <v-text-field
              autocomplete="off"
              dense
              name="name"
              :label="$t('employee.attributes.names')"
              outlined
              required
              disabled
              v-model="userDataRequest.Nombres"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" md="4">
            <v-text-field
              autocomplete="off"
              dense
              name="lastname"
              :label="$t('employee.attributes.lastname')"
              outlined
              required
              disabled
              v-model="userDataRequest.ApellidoPaterno"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" md="4">
            <v-text-field
              autocomplete="off"
              dense
              name="surname"
              :label="$t('employee.attributes.surname')"
              outlined
              required
              disabled
              v-model="userDataRequest.ApellidoMaterno"
            ></v-text-field>
          </v-col>
          <v-col class="py-0 my-0" cols="12" :md="!isCreated ? '10' : '12'">
            <v-autocomplete
              v-model="userDataRequest.IdPerfil"
              dense
              outlined
              label="Perfil"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2" class="py-0" v-if="!isCreated">
            <v-checkbox dense label="Bloquear" hide-details=""></v-checkbox>
          </v-col>
          <v-col cols="12" class="py-0">
            <v-textarea outlined dense label="Roles" no-resize></v-textarea>
          </v-col>
          <v-col cols="6" class="py-0">
            <DatePicker
              v-if="datesLabels.dateBegin"
              v-model="userDataRequest.FechaInicio"
              :label="datesLabels.dateBegin"
              cleareable
              @clear="clearDateBegin"
              :maxDate="userDataRequest.FechaTermino"
            />
          </v-col>
          <v-col cols="6" class="py-0">
            <DatePicker
              v-if="datesLabels.dateFinish"
              v-model="userDataRequest.FechaTermino"
              :label="datesLabels.dateFinish"
              cleareable
              @clear="clearDateFinish"
              :minDate="userDataRequest.FechaInicio"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="light darken-1" text @click="closeDialog">
          {{ $t("users.labels.dialogs.createUser.actions.dismiss") }}
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="saveUser"> Guardar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue, Watch } from "vue-property-decorator";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { IShowEmployee, IUserRequest } from "@/services/EmployeeService/types";
import { ICompany } from "@/services/CompanyService/types";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import CompanyService from "@/services/CompanyService";

// components
import DatePicker from "@/components/Form/DatePicker.vue";

@Component({
  components: {
    DatePicker,
  },
})
export default class UserCreationDialog extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected companyService = new CompanyService();

  @PropSync("open")
  public isDialogOpen!: boolean;

  @Prop()
  public employeeData?: IShowEmployee;

  @Prop({
    type: Boolean,
    required: false,
    default() {
      return true;
    },
  })
  public isCreated = true;

  public userDataRequest: IUserRequest = {
    IdEmpleado: 0,
    IdPerfil: 0,
    IdTipoEmpleado: 0,
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaInicio: "",
    FechaTermino: "",
  };
  public employeeTypeList: Array<IEmployeeType> = [];
  public companies: Array<ICompany> = [];
  public isLoadingEmployeeList = false;
  public isLoadingCompanies = false;

  @Watch("isDialogOpen")
  getDataLists(): void {
    if (this.isDialogOpen) {
      this.getEmployeeTypes();
      this.getCompanies();
    }
  }

  created(): void {

    this.setUserDataPerson();

  }

  get datesLabels() {
    return {
      dateBegin: "Fecha Inicio",
      dateFinish: "Fecha Término",
    };
  }

  setUserDataPerson() {
    if (this.isCreated) {
      this.userDataRequest = {
        ...this.userDataRequest,
        IdEmpleado: this.employeeData?.IdEmpleado || 0,
        IdTipoEmpleado: this.employeeData?.TipoEmpleado?.Id || 0,
        Nombres: this.employeeData?.Persona?.Nombres || "",
        ApellidoPaterno: this.employeeData?.Persona?.ApellidoPaterno || "",
        ApellidoMaterno: this.employeeData?.Persona?.ApellidoMaterno || "",
      };
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

  getCompanies(): void {
    this.isLoadingCompanies = true;
    this.companyService
      .getAll()
      .then((response) => {
        this.companies = response.Data;
      })
      .finally(() => {
        this.isLoadingCompanies = false;
      });
  }

  clearDateBegin(): void {
    this.userDataRequest.FechaInicio = "";
  }

  clearDateFinish(): void {
    this.userDataRequest.FechaTermino = "";
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  saveUser(): void {
    this.isDialogOpen = false;
  }
}
</script>

<style scoped></style>
