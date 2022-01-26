<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("employeeConsultationMFE.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="generateReport"
            :disabled="isLoadingEmployeeList"
          >
            {{ $t("employeeConsultationMFE.labels.export") }}
          </v-btn>
          <v-btn
            class="mx-1"
            color="success"
            :to="{ name: 'people:create' }"
            :disabled="isLoadingEmployeeList"
          >
            {{ $t("employeeConsultationMFE.labels.add") }}
          </v-btn>
        </v-toolbar>
        <v-container fluid>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
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
                :disabled="isLoadingEmployeeList"
                v-model="params.IdTipoEmpleado"
              ></v-autocomplete>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="names"
                :disabled="isLoadingEmployeeList"
                :label="$t('employee.attributes.names')"
                outlined
                required
                @click:clear="getEmployeeList"
                v-model="params.Nombres"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                clearable
                dense
                name="curp"
                :label="$t('employee.attributes.curp')"
                outlined
                required
                :disabled="isLoadingEmployeeList"
                @click:clear="getEmployeeList"
                v-model="params.Curp"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="lastname"
                :disabled="isLoadingEmployeeList"
                :label="$t('employee.attributes.lastname')"
                outlined
                required
                @click:clear="getEmployeeList"
                v-model="params.ApellidoPaterno"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="assignmentNumber"
                :label="$t('employee.attributes.assignmentNumber')"
                outlined
                required
                :disabled="isLoadingEmployeeList"
                @click:clear="getEmployeeList"
                v-model="params.IdEmpleado"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-text-field
                dense
                clearable
                name="surname"
                :disabled="isLoadingEmployeeList"
                :label="$t('employee.attributes.surname')"
                outlined
                required
                @click:clear="getEmployeeList"
                v-model="params.ApellidoMaterno"
              ></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" md="3">
              <v-btn
                color="success"
                :disabled="isLoadingEmployeeList"
                @click="search"
              >
                {{ $t("employeeConsultationMFE.labels.search") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-progress-linear
          :active="isLoadingEmployeeList"
          :indeterminate="isLoadingEmployeeList"
        ></v-progress-linear>
        <v-data-table
          :items-per-page="5"
          class="elevation-1 mt-5"
          :headers="headers"
          :items="employeeList"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn
              x-small
              :to="{ name: 'people:show', params: { id: item.IdEmpleado } }"
            >
              Ver
            </v-btn>
            <v-btn
              x-small
              :to="{ name: 'people:edit', params: { id: item.IdEmpleado } }"
            >
              Editar
            </v-btn>
            <v-btn x-small @click="requestDeleteConfirmation(item)">
              Eliminar
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </div>

    <delete-dialog
      :open.sync="confirmDialogOpen"
      :data="employeeData"
      @onDelete="updateList"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EmployeeService from "@/services/EmployeeService";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import {
  ICreateEmployeeResponse,
  IShowEmployee,
} from "@/services/EmployeeService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import DeleteDialog from "@/views/mfe/employeeConsultation/components/deleteDialog.vue";
import download from "downloadjs";

const initialEmployeeData: IShowEmployee = {
  IdEmpleado: undefined,
  Estado: "",
  TipoEmpleado: {
    Nombre: "",
  },
  Persona: {
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    FechaNacimiento: "",
    Sexo: "",
    RFC: "",
    Curp: "",
  },
  Filiacion: {
    Referencia: "",
  },
  Sindicato: {
    Nombre: "",
  },
  SeccionSindical: {
    Nombre: "",
  },
  CentroTrabajo: {
    Empresa: "",
    Descripcion: "",
  },
};

@Component({
  components: { DeleteDialog },
})
export default class EmployeeList extends Vue {
  protected employeeService = new EmployeeService();
  protected employeeTypesService = new EmployeeTypeService();
  public employeeList: Array<ICreateEmployeeResponse> = [];
  public employeeTypeList: Array<IEmployeeType> = [];
  public isLoadingEmployeeList = false;
  public confirmDialogOpen = false;
  public employeeData = { ...initialEmployeeData };
  public params = {
    IdTipoEmpleado: null,
    Nombres: "",
    Curp: "",
    ApellidoPaterno: "",
    IdEmpleado: "",
    ApellidoMaterno: "",
  };
  public headers = [
    {
      text: this.$t("employeeConsultationMFE.attributes.typeOfEmployee"),
      value: "TipoEmpleado.Nombre",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.names"),
      value: "Persona.Nombres",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.lastname"),
      value: "Persona.ApellidoPaterno",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.surname"),
      value: "Persona.ApellidoMaterno",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.curp"),
      value: "Persona.Curp",
      sortable: false,
    },
    {
      text: this.$t("employeeConsultationMFE.attributes.assignmentNumber"),
      value: "IdEmpleado",
      sortable: false,
    },
    { text: "", value: "actions", align: "end", sortable: false },
  ];

  get filters() {
    return {
      ...this.params,
    };
  }

  get reportHeaders() {
    return this.headers
      .filter((item) => !["actions"].includes(item.value))
      .map((header) => ({
        Nombre: header.value,
        Personalizado: header.text as string,
      }));
  }

  getEmployeeList(): void {
    this.isLoadingEmployeeList = true;
    this.employeeService
      .getAll()
      .then((response) => {
        if (response.Success) {
          this.employeeList = response.Data;
        }
      })
      .catch((err) => {
        if (err.response) {
          console.error(err.response);
        }
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  getEmployeeTypes(): void {
    this.isLoadingEmployeeList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.Data;
      })
      .catch((error) => {
        console.error(error.response);
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  requestDeleteConfirmation(employee: ICreateEmployeeResponse): void {
    this.confirmDialogOpen = true;
    this.employeeData = employee;
  }

  updateList(data: ICreateEmployeeResponse): void {
    const index = this.employeeList.indexOf(data);

    this.employeeList.splice(index, 1);
  }

  search(): void {
    this.isLoadingEmployeeList = true;
    this.employeeService
      .filter(this.filters)
      .then((response) => {
        if (response.Success) {
          this.$store.dispatch("app/setNotify", {});
          this.employeeList = response.Data;
        }
      })
      .catch((err) => {
        if (err.response) {
          (this as any).customError(
            err?.response?.status,
            err?.response?.data?.Message?.Texto
          );
          console.error(err?.response);
        }
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  generateReport(): void {
    this.isLoadingEmployeeList = true;
    const data = {
      NombreReporte: "Reporte",
      Propiedades: this.reportHeaders,
    };
    this.employeeService
      .export(data, this.filters)
      .then((response) => {
        if (response.data) {
          (this as any).ok(this.$t("notify.reportGenerate") as string);
          download(
            response.data,
            `${data.NombreReporte}.xlsx`,
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          );
        }
      })
      .catch((err) => {
        if (err.response) {
          (this as any).customError(
            err?.response?.status,
            err?.response?.data?.Message?.Texto
          );
          console.error(err?.response);
        }
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  mounted(): void {
    this.getEmployeeList();
    this.getEmployeeTypes();
  }
}
</script>

<style scoped></style>
