<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("searchEmployee.search.title") }}
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
                <v-col cols="12" sm="12" md="4">
                  <v-autocomplete
                    dense
                    name="employeeType"
                    :items="employeeTypeList"
                    item-text="Nombre"
                    item-value="Id"
                    :label="$t('searchEmployee.search.searchForm.employeeType')"
                    outlined
                    v-model="searchRequest.IdTipoEmpleado"
                    :loading="isLoadingEmployeeList"
                    :disabled="isLoadingEmployeeList"
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="$t('searchEmployee.search.searchForm.names')"
                    v-slot="{ errors }"
                    rules="max:150"
                  >
                    <v-text-field
                      :label="$t('searchEmployee.search.searchForm.names')"
                      name="names"
                      dense
                      outlined
                      v-model="searchRequest.Nombres"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="$t('searchEmployee.search.searchForm.curp')"
                    v-slot="{ errors }"
                    rules="max:18"
                  >
                    <v-text-field
                      :label="$t('searchEmployee.search.searchForm.curp')"
                      name="curp"
                      dense
                      outlined
                      v-model="searchRequest.Curp"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="$t('searchEmployee.search.searchForm.lastname')"
                    v-slot="{ errors }"
                    rules="max:150"
                  >
                    <v-text-field
                      :label="$t('searchEmployee.search.searchForm.lastname')"
                      name="lastname"
                      dense
                      outlined
                      v-model="searchRequest.ApellidoPaterno"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="4">
                  <ValidationProvider
                    :name="
                      $t('searchEmployee.search.searchForm.assignmentNumber')
                    "
                    v-slot="{ errors }"
                    rules="numeric|max:8"
                  >
                    <v-text-field
                      :label="
                        $t('searchEmployee.search.searchForm.assignmentNumber')
                      "
                      name="assignmentNumber"
                      dense
                      outlined
                      v-model="searchRequest.IdEmpleado"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <ValidationProvider
                    :name="$t('searchEmployee.search.searchForm.surname')"
                    v-slot="{ errors }"
                    rules="max:150"
                  >
                    <v-text-field
                      :label="$t('searchEmployee.search.searchForm.surname')"
                      name="surname"
                      dense
                      outlined
                      v-model="searchRequest.ApellidoMaterno"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="2">
                  <v-btn type="submit" color="success" dark large dense>
                    {{ $t("searchEmployee.search.buttons.search") }}
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>

          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-progress-linear
                :active="isLoadingEmployeeSearch"
                :indeterminate="isLoadingEmployeeSearch"
              ></v-progress-linear>
              <v-data-table
                :headers="headers"
                :items="searchResponse"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>
                      <v-btn
                        class="mx-2"
                        @click="
                          onButtonClick(
                            row.item.IdEmpleado,
                            row.item.Nombres,
                            row.item.ApellidoPaterno,
                            row.item.ApellidoMaterno,
                            row.item.TipoEmpleadoDescripcion,
                            row.item.IdTipoEmpleado,
                            row.item.IdPersona
                          )
                        "
                      >
                        <v-icon dark>mdi-eye</v-icon>
                      </v-btn>
                    </td>
                    <td>{{ row.item.TipoEmpleadoDescripcion }}</td>
                    <td>{{ row.item.Nombres }}</td>
                    <td>{{ row.item.ApellidoPaterno }}</td>
                    <td>{{ row.item.ApellidoMaterno }}</td>
                    <td>{{ row.item.Curp }}</td>
                    <td>{{ row.item.IdEmpleado }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import EmployeeService from "@/services/EmployeeService";
import {
  ISearchRequest,
  ISearchResponse,
} from "@/services/EmployeeService/types";
import { IConsultation, IConsultationState } from "@/store/consultation/types";
import BeneficiaryService from "@/services/BeneficiaryService";

@Component({})
export default class SearchEmployee extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  protected beneficiaryService = new BeneficiaryService();
  public employeeTypeList: Array<IEmployeeType> = [];
  public searchData: Array<any> = [];
  public isLoadingEmployeeList = false;
  public isLoadingEmployeeSearch = false;
  public searchRequest: ISearchRequest = {
    IdEmpleado: null,
    IdTipoEmpleado: null,
    Curp: null,
    Nombres: null,
    ApellidoPaterno: null,
    ApellidoMaterno: null,
  };
  public consultation: IConsultation = {
    assigmentNumber: null,
    employeeType: null,
    fullname: null,
    employeeTypeId: null,
    groupPersonal: null,
    areaPersonal: null,
    idPerson: null,
    departmentCenter: "",
    departmentDescription: "",
    validity: "",
    validityStatus: false,
  };
  public searchResponse: Array<ISearchResponse> = [];
  public headers: Array<any> = [
    { text: "", value: "actions", sortable: false },
    {
      text: this.$t("searchEmployee.search.searchForm.employeeType"),
      align: "start",
      sortable: false,
      value: "tipo_emp_desc",
    },
    {
      text: this.$t("searchEmployee.search.searchForm.names"),
      value: "nombres",
    },
    {
      text: this.$t("searchEmployee.search.searchForm.lastname"),
      value: "ap_paterno",
    },
    {
      text: this.$t("searchEmployee.search.searchForm.surname"),
      value: "ap_materno",
    },
    { text: this.$t("searchEmployee.search.searchForm.curp"), value: "curp" },
    {
      text: this.$t("searchEmployee.search.searchForm.assignmentNumber"),
      value: "num_empleado",
    },
  ];

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
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

  onSubmit(): void {
    this.isLoadingEmployeeSearch = true;
    this.employeeService
      .search(this.searchRequest)
      .then((response) => {
        this.searchResponse = response.Data;
      })
      .finally(() => {
        this.isLoadingEmployeeSearch = false;
      });
  }

  onButtonClick(
    assignmentNumber: number,
    names: string,
    lastname: string,
    surname: string,
    employeeType: string,
    employeeTypeId: number,
    idPerson: number
  ): void {
    this.consultation.assigmentNumber = assignmentNumber;
    this.consultation.fullname = names + " " + lastname + " " + surname;
    this.consultation.employeeType = employeeType;
    this.consultation.employeeTypeId = employeeTypeId;
    this.consultation.idPerson = idPerson;

    if (this.consultation.employeeTypeId == 0) {
      this.beneficiaryService
        .getValidityRights(
          this.consultation.assigmentNumber,
          this.consultation.employeeTypeId
        )
        .then((response) => {
          this.consultation.groupPersonal = response.Data.GrupoPersonal;
          this.consultation.areaPersonal = response.Data.AreaPersonal;
          this.consultation.departmentCenter = response.Data.CentroDepto;
          this.consultation.departmentDescription =
            response.Data.DepartamentoDescripcion;
          this.consultation.validity = response.Data.Vigencia;
          this.consultation.validityStatus = response.Data.EstadoVigencia;
        })
        .finally(() => {
          this.setConsultationData(this.consultation);
          this.$router.push({ name: "mvd:people:employeeConsultation" });
        });
    } else {
      this.setConsultationData(this.consultation);
      this.$router.push({ name: "mvd:people:employeeConsultation" });
    }
  }

  setConsultationData(data: IConsultation): void {
    this.$store.dispatch("consultation/setConsultationData", data);
  }

  mounted(): void {
    this.getEmployeeTypes();
  }
}
</script>
