<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("users.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-1"
            color="success"
            :disabled="isLoadingUsersList"
            @click="openUserModal"
          >
            {{ $t("users.labels.add") }}
            <v-icon right dark>mdi-account-plus</v-icon>
          </v-btn>
        </v-toolbar>

        <v-progress-linear
          :active="isLoadingUsersList"
          :indeterminate="isLoadingUsersList"
        ></v-progress-linear>

        <v-container fluid></v-container>

        <v-row class="px-2" dense>
          <v-col cols="6" md="3">
            <v-text-field
              outlined
              dense
              label="Número de Asignación"
              v-model="userFilterModel.IdEmpleado"
              @keypress.enter="getUserList"
              clearable
              @click:clear="clearNumberAssign"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field
              outlined
              dense
              label="Nombre"
              v-model="userFilterModel.Nombre"
              @keypress.enter="getUserList"
              clearable
              @click:clear="clearName"
            ></v-text-field>
          </v-col>
          <v-col cols="6" md="3">
            <v-autocomplete
              :items="profiles"
              item-text="Nombre"
              item-value="IdPerfil"
              outlined
              dense
              label="Perfil"
              v-model="userFilterModel.IdPerfil"
              @change="getUserList"
              clearable
              @click:clear="clearProfile"
            ></v-autocomplete>
          </v-col>
          <v-col cols="6" md="3">
            <v-text-field
              outlined
              dense
              label="Estado"
              v-model="userFilterModel.Estado"
              @change="getUserList"
              clearable
              @click:clear="clearState"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-data-table
          :items-per-page="5"
          class="elevation-1 mt-2"
          :headers="headers"
          :items="userList"
        >
          <template v-slot:[`item.locked`]="{ item }">
            <v-switch
              dense
              v-model="item.Bloqueado"
              @change="changeStateUser(item)"
              :color="!item.Bloqueado ? 'primary': 'success'"
            ></v-switch>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              class="mx-1"
              color="info"
              outlined
              fab
              x-small
              @click="viewContacts(item)"
            >
              <v-icon dark>mdi-contacts</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              color="red"
              outlined
              x-small
              fab
              @click="editUser(item)"
            >
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
              class="mx-1"
              color="error"
              outlined
              fab
              x-small
              @click="eliminationUser(item)"
            >
              <v-icon dark>mdi-account-remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <UserDialog
      :open.sync="confirmDialogOpen"
      :employeeData.sync="employeeData"
    />
    <UserCreationDialog
      v-if="openUserCreationDialog"
      :open.sync="openUserCreationDialog"
      :employee-data="employeeData"
      :user="userSelected"
      :isCreated="isCreated"
      @refresh="refresListUsers"
    />

    <ContactsDialog
      v-if="userContactsDialog"
      v-model="userContactsDialog"
      :idPerson="idPersonSelected"
      @refresh="refresListUsers"
    />

    <ConfirmationDialog
      title="Eliminar Usuario"
      text="¿Realmente deseas eliminar el usuario?"
      v-model="confirmEliminationModel"
      @confirm="confirmElimination"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

import UserDialog from "@/views/admin/users/components/UserDialog.vue";
import ContactsDialog from "@/components/Contacts/ContactsDialog.vue";
import ConfirmationDialog from "@/components/Dialogs/ConfirmationDialog.vue";
import UserCreationDialog from "@/views/admin/users/components/UserCreationDialog.vue";

import { IUser, IUserFilterRequest } from "@/services/UserService/types";
import { IShowEmployee } from "@/services/EmployeeService/types";
import { IProfile } from "@/services/ProfileService/types";

import UserService from "@/services/UserService";
import ProfileService from "@/services/ProfileService";

@Component({
  components: {
    UserCreationDialog,
    UserDialog,
    ContactsDialog,
    ConfirmationDialog,
  },
})
export default class UsersList extends Vue {
  protected userService = new UserService();
  protected profileService = new ProfileService();

  public isLoadingUsersList = false;
  public userList: Array<IUser> = [];
  public headers = [
    {
      text: this.$t("users.attributes.assignmentNumber"),
      value: "IdEmpleado",
      sortable: false,
    },
    {
      text: this.$t("users.attributes.typeOfEmployee"),
      value: "TipoEmpleado",
      sortable: false,
    },
    {
      text: this.$t("users.attributes.name"),
      value: "NombreCompleto",
      sortable: false,
      width: "25%",
    },
    {
      text: this.$t("users.attributes.login"),
      value: "UltimaSesion",
      sortable: false,
    },
    {
      text: this.$t("users.attributes.profileName"),
      value: "Perfil.Nombre",
      sortable: false,
      width: "25%",
    },
    {
      text: this.$t("users.attributes.state"),
      value: "Estado",
      sortable: false,
    },
    {
      text: this.$t("users.attributes.validity"),
      value: "FechaTermino",
      sortable: false,
    },
    {
      text: "Bloquear",
      value: "locked",
    },
    {
      text: "",
      value: "actions",
      width: "20%",
      align: "end",
      sortable: false,
    },
  ];
  public confirmDialogOpen = false;
  public openUserCreationDialog = false;
  public employeeData?: IShowEmployee = {};
  public userContactsDialog = false;
  public isCreated = true;
  public confirmEliminationModel = false;
  public userSelected: IUser = {
    IdUsuario: null,
    IdEmpleado: null,
    IdTipoEmpleado: null,
    TipoEmpleado: "",
    IdPersona: null,
    NombreCompleto: "",
    Estado: "",
    FechaInicio: "",
    FechaTermino: "",
    PrimeraSesion: "",
    UltimaSesion: "",
    Contador: null,
    Baja: false,
    Bloqueado: null,
    Perfil: {
      IdPerfil: 0,
      Nombre: "",
      Siglas: "",
      Descripcion: "",
      Estado: "",
      Baja: false,
      Roles: {
        IdRol: 0,
        IdModulo: 0,
        Clave: "",
        Descripcion: "",
        Modulo: null,
        Baja: false,
      },
    },
    Roles: null,
  };
  public idPersonSelected: number | null = null;
  public userFilterModel: IUserFilterRequest = {
    IdEmpleado: null,
    IdPerfil: null,
    Nombre: null,
    Estado: null,
  };
  profiles: Array<IProfile> = [];

  created() {}

  mounted(): void {
    this.getUserList();
    this.getProfilesList();
  }

  getUserList(): void {
    this.isLoadingUsersList = true;
    this.userService
      .getByFilter(this.userFilterModel)
      .then((response) => {
        this.userList = response.Data;
      })
      .catch()
      .finally(() => {
        this.isLoadingUsersList = false;
      });
  }

  getProfilesList(): void {
    this.profileService.getAll().then((response: any) => {
      let data: Array<IProfile> = response.Data;

      this.profiles = data;
    });
  }

  @Watch("employeeData")
  test(): void {
    this.openUserCreationDialog = true;
  }

  viewContacts(item: IUser): void {
    this.userContactsDialog = true;
    this.idPersonSelected = item.IdPersona;
  }

  openUserModal(): void {
    this.confirmDialogOpen = true;
    this.isCreated = true;
  }

  editUser(item: IUser) {
    this.userSelected = item;
    this.openUserCreationDialog = true;
    this.isCreated = false;
    this.employeeData = {};
  }

  eliminationUser(item: IUser) {
    this.userSelected = item;
    this.confirmEliminationModel = true;
  }

  confirmElimination(value: boolean) {
    let vm = this as any;

    if (value) {
      vm.userService
        .delete(vm.userSelected?.IdUsuario || 0)
        .then((res: any) => {
          if (res.Success) {
            vm.ok("El usuario se ha eliminado correctamente");
          }
          vm.getUserList();
        })
        .finally(() => {
          vm.userSelected = null;
        });
    }
  }

  refresListUsers() {
    this.getUserList();
    this.idPersonSelected = null;
  }

  clearNumberAssign(): void {
    this.userFilterModel.IdEmpleado = null;
    this.getUserList();
  }

  clearName(): void {
    this.userFilterModel.Nombre = null;
    this.getUserList();
  }

  clearProfile(): void {
    this.userFilterModel.IdPerfil = null;
    this.getUserList();
  }

  clearState(): void {
    this.userFilterModel.Estado = null;
    this.getUserList();
  }

  changeStateUser(item: IUser) {
    let vm = this as any;

    vm.userService
      .setStateChangeByUserId(
        <number>item.IdUsuario,
        (<boolean>item.Bloqueado)
      )
      .then((res: any) => {
        let success = res.Success;

        if (success) {
          let message = <boolean>res.Data.Bloqueado
            ? "Usuario bloqueado correctamente"
            : "Usuario desbloqueado correctamente";

          vm.ok(message);
        }
      })
      .finally(() => {
        vm.getUserList();
      });
  }
}
</script>

<style scoped></style>
