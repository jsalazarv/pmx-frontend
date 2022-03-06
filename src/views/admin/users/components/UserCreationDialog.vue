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
        <v-form ref="form">
          <v-row dense>
            <v-col class="py-0" cols="12" md="6">
              <v-text-field
                autocomplete="off"
                dense
                name="assignmentNumber"
                :label="$t('employee.attributes.assignmentNumber')"
                outlined
                required
                readonly
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
                v-model="userDataRequest.IdTipoEmpleado"
                readonly
              ></v-autocomplete>
            </v-col>
            <v-col class="py-0" cols="12">
              <v-text-field
                autocomplete="off"
                dense
                name="name"
                :label="$t('employee.attributes.names')"
                outlined
                required
                readonly
                v-model="userDataRequest.Nombres"
              ></v-text-field>
            </v-col>
            <v-col class="py-0 my-0" cols="12" :md="!isCreated ? '10' : '12'">
              <v-autocomplete
                v-model="profileModel"
                :items="profiles"
                dense
                outlined
                label="Perfil"
                item-text="Nombre"
                return-object
                @change="changeProfile"
                :rules="[rules.required]"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" class="py-0">
              <v-textarea
                outlined
                dense
                label="Roles"
                no-resize
                v-model="rolesText"
              ></v-textarea>
            </v-col>
            <v-col cols="6" class="py-0">
              <DatePicker
                v-if="datesLabels.dateBegin"
                v-model="userDataRequest.FechaInicio"
                :label="datesLabels.dateBegin"
                cleareable
                @clear="clearDateBegin"
                :maxDate="userDataRequest.FechaTermino"
                :rules="[rules.required]"
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
                :rules="[rules.required]"
              />
            </v-col>
          </v-row>
        </v-form>
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
import { IShowEmployee } from "@/services/EmployeeService/types";
import { IUser, IUserRequest } from "@/services/UserService/types";
import { ICompany } from "@/services/CompanyService/types";
import { IProfile } from "@/services/ProfileService/types";
import { IRoles } from "@/services/RolesService/types";

import ProfileService from "@/services/ProfileService";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import CompanyService from "@/services/CompanyService";
import UserService from "@/services/UserService";

// components
import DatePicker from "@/components/Form/DatePicker.vue";

@Component({
  components: {
    DatePicker,
  },
  props: {
    isCreated: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
    },
  },
})
export default class UserCreationDialog extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected companyService = new CompanyService();
  protected profileService = new ProfileService();
  protected userService = new UserService();

  @PropSync("open")
  public isDialogOpen!: boolean;

  @Prop()
  public employeeData?: IShowEmployee;

  @Prop()
  public user?: IUser;

  public userDataRequest: IUserRequest = {
    IdUsuario: null,
    IdEmpleado: null,
    IdPerfil: null,
    IdTipoEmpleado: null,
    Nombres: "",
    FechaInicio: "",
    FechaTermino: "",
  };
  public employeeTypeList: Array<IEmployeeType> = [];
  public companies: Array<ICompany> = [];
  public isLoadingEmployeeList = false;
  public isLoadingCompanies = false;
  public profiles: Array<IProfile> = [];
  public roles: Array<IRoles> = [];
  public profileModel: IProfile = {
    IdPerfil: 0,
    Nombre: "",
    Siglas: "",
    Descripcion: "",
    Estado: "",
    Baja: false,
    Roles: [],
  };
  public rules: object = {
    required: (val: any) => !!val || "El campo es requerido",
  };

  @Watch("isDialogOpen")
  getDataLists(): void {
    if (this.isDialogOpen) {
      this.init();
    }
  }

  created(): void {
    this.init();
  }

  init(): void {
    this.getEmployeeTypes();
    this.getCompanies();
    this.setUserDataPerson();
    this.getPerfil();
  }

  get datesLabels() {
    return {
      dateBegin: "Fecha Inicio",
      dateFinish: "Fecha Término",
    };
  }

  get rolesText() {
    let roles = this.roles.map((rol) => rol.Descripcion);

    return roles.join(", ");
  }

  get getPerfilSelected(): IProfile {
    let idProfile: number = this.userDataRequest?.IdPerfil || 0;

    return (
      this.profiles.find((x) => x.IdPerfil === idProfile) || this.profileModel
    );
  }

  setUserDataPerson() {
    if ((this as any).isCreated) {
      let nombres = `${this.employeeData?.Persona?.Nombres} ${
        this.employeeData?.Persona?.ApellidoPaterno
      } ${this.employeeData?.Persona?.ApellidoMaterno || ""}`;

      this.userDataRequest = {
        IdEmpleado: this.employeeData?.IdEmpleado || 0,
        IdTipoEmpleado: this.employeeData?.TipoEmpleado?.Id || 0,
        Nombres: nombres,
        FechaInicio: '',
        FechaTermino: '',
        IdPerfil: null,
        IdUsuario: null
      };

      this.userDataRequest.IdUsuario = null;
    } else {
      this.userDataRequest = {
        IdUsuario: this.user?.IdUsuario || null,
        IdEmpleado: this.user?.IdEmpleado || null,
        IdPerfil: this.user?.Perfil?.IdPerfil || null,
        IdTipoEmpleado: this.user?.IdTipoEmpleado || null,
        Nombres: this.user?.NombreCompleto || null,
        FechaInicio: this.user?.FechaInicio || "",
        FechaTermino: this.user?.FechaTermino || "",
      };

      setTimeout(() => {
        this.profileModel = this.getPerfilSelected;
        this.roles = this.getPerfilSelected.Roles;
      }, 2000);
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

  getPerfil(): void {
    this.profileService.getAll().then((response: any) => {
      this.profiles = response.Data;
    });
  }

  changeProfile(item: IProfile) {
    this.userDataRequest.IdPerfil = item.IdPerfil;
    this.roles = item.Roles;
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
    let vm = this as any;

    if (vm.$refs.form.validate()) {
      if (!vm.isCreated) {
        vm.updateUser();
      } else {
        vm.createUser();
      }
    }
  }

  createUser() {
    let vm = this as any;

    vm.userService
      .create(vm.userDataRequest)
      .then((res: any) => {
        if (res.Success) {
          vm.ok("El usuario se ha creado correctamente");
        } 
        vm.$emit("refresh");
      })
      .catch((err: any) => {
        vm.customError(err?.response?.status, err?.response?.data?.Message);
      })
      .finally(() => {
        this.isDialogOpen = false;
      });
  }

  updateUser() {
    let vm = this as any;

    vm.userService
      .update(vm.userDataRequest)
      .then((res: any) => {
        if (res.Success) {
          vm.ok("El usuario se ha actualizado correctamente");
        }
        vm.$emit("refresh");
      })
      .finally(() => {
        this.isDialogOpen = false;
      });
  }
}
</script>

<style scoped></style>
