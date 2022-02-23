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
        <v-data-table
          :items-per-page="5"
          class="elevation-1 mt-5"
          :headers="headers"
          :items="userList"
        >
          <template>
            <v-btn class="mx-1" color="info" outlined fab x-small>
              <v-icon dark>mdi-account-eye</v-icon>
            </v-btn>
            <v-btn class="mx-1" color="success" outlined x-small fab>
              <v-icon dark>mdi-account-edit</v-icon>
            </v-btn>
            <v-btn class="mx-1" color="error" outlined fab x-small>
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
      :open.sync="openUserCreationDialog"
      :employee-data="employeeData"
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
@Component({
  components: { UserCreationDialog, UserDialog },
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
      value: "Nombre",
      sortable: false,
    },
    {
      text: this.$t("users.attributes.login"),
      value: "InicioSesion",
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
      value: "Vigencia",
      sortable: false,
    },
    { text: "", value: "actions", align: "end", sortable: false },
  ];
  public confirmDialogOpen = false;
  public openUserCreationDialog = false;
  public employeeData?: IShowEmployee = {};

  getUserList(): void {
    this.isLoadingUsersList = true;
    this.userService
      .getAll()
      .then((response) => {
        this.userList = response.Data;
      })
      .catch()
      .finally(() => {
        this.isLoadingUsersList = false;
      });
  }

  openUserModal(): void {
    this.confirmDialogOpen = true;
  }

  @Watch("employeeData")
  test(): void {
    this.openUserCreationDialog = true;
  }

  mounted(): void {
    this.getUserList();
  }
}
</script>

<style scoped></style>
