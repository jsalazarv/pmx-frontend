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
        <v-container fluid></v-container>
        <v-progress-linear
          :active="isLoadingUsersList"
          :indeterminate="isLoadingUsersList"
        ></v-progress-linear>

        <v-row class="px-2" dense>
          <v-col cols="4">
            <v-text-field
              outlined
              dense
              label="Filtrar por número de asignación, nombre"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-autocomplete outlined dense label="Perfil"></v-autocomplete>
          </v-col>
          <v-col cols="3">
            <v-autocomplete outlined dense label="Estado"></v-autocomplete>
          </v-col>
        </v-row>

        <v-data-table
          :items-per-page="5"
          class="elevation-1 mt-5"
          :headers="headers"
          :items="userList"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              class="mx-1"
              color="info"
              outlined
              fab
              x-small
              @click="viewContacts(item)"
            >
              <v-icon dark>mdi-account-plus</v-icon>
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
    />

    {{ isCreated }}

    <UserContactsDialog v-model="userContactsDialog" />

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
import { IUser } from "@/services/UserService/types";
import UserService from "@/services/UserService";
import UserDialog from "@/views/admin/users/components/UserDialog.vue";
import { IShowEmployee } from "@/services/EmployeeService/types";
import UserCreationDialog from "@/views/admin/users/components/UserCreationDialog.vue";
import UserContactsDialog from "./components/UserContactsDialog.vue";
import ConfirmationDialog from "@/components/Dialogs/ConfirmationDialog.vue";

// import data_json from "./users.json";
// import { IEmployee } from "@/store/employee/types";

@Component({
  components: {
    UserCreationDialog,
    UserDialog,
    UserContactsDialog,
    ConfirmationDialog,
  },
})
export default class UsersList extends Vue {
  protected userService = new UserService();
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
    { text: "", value: "actions", align: "end", sortable: false },
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
    NombreCompleto: "",
    Estado: "",
    FechaInicio: "",
    FechaTermino: "",
    PrimeraSesion: "",
    UltimaSesion: "",
    Contador: null,
    Baja: false,
    Perfil: null,
    Roles: null,
  };

  created() {}

  mounted(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.isLoadingUsersList = true;
    this.userService
      .getAll()
      .then((response) => {
        console.log("uy", response.Data);
        this.userList = response.Data;
      })
      .catch()
      .finally(() => {
        this.isLoadingUsersList = false;
      });
  }

  @Watch("employeeData")
  test(): void {
    this.openUserCreationDialog = true;
  }

  viewContacts(item: any): void {
    console.log(item);
    this.userContactsDialog = true;
  }

  openUserModal(): void {
    this.confirmDialogOpen = true;
    this.isCreated = true;
  }

  editUser(item: IUser) {
    console.log(item);
    this.userSelected = item;
    this.openUserCreationDialog = true;
    this.isCreated = false;
    this.employeeData = {};
  }

  eliminationUser(item: IShowEmployee) {
    this.confirmEliminationModel = true;
  }

  confirmElimination(value: boolean) {
    alert(value);
  }
}
</script>

<style scoped></style>
