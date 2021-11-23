<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
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
                    v-model="search.id_tipo_emp"
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
                      v-model="search.nombres"
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
                      v-model="search.curp"
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
                      v-model="search.ap_paterno"
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
                      v-model="search.num_empleado"
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
                      v-model="search.ap_materno"
                      :error-messages="errors"
                    >
                    </v-text-field>
                  </ValidationProvider>
                </v-col>

                <v-col cols="12" sm="12" md="2">
                  <v-btn type="submit" color="success" dark large dense>
                    Buscar
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
                :items="searchResult"
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
                            row.item.num_empleado,
                            row.item.nombres,
                            row.item.ap_paterno,
                            row.item.ap_materno,
                            row.item.tipo_emp_desc,
                            row.item.tipo_empleado
                          )
                        "
                      >
                        <v-icon dark>mdi-eye</v-icon>
                      </v-btn>
                    </td>
                    <td>{{ row.item.tipo_emp_desc }}</td>
                    <td>{{ row.item.nombres }}</td>
                    <td>{{ row.item.ap_paterno }}</td>
                    <td>{{ row.item.ap_materno }}</td>
                    <td>{{ row.item.curp }}</td>
                    <td>{{ row.item.num_empleado }}</td>
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
// import SearchEmployeeService from "@/services/SearchEmployeeService";
// import { ISearch, ISearchResult } from "@/services/SearchEmployeeService/types";
import EmployeeService from "@/services/EmployeeService";
import { ISearch, ISearchResult } from "@/services/EmployeeService/types";
import { IConsultation, IConsultationState } from "@/store/consultation/types";
// import { extend } from "vee-validate";
// import { numeric } from "vee-validate/dist/rules";

@Component({})
export default class SearchEmployee extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected employeeService = new EmployeeService();
  public employeeTypeList: Array<IEmployeeType> = [];
  public searchData: Array<any> = [];
  public isLoadingEmployeeList = false;
  public isLoadingEmployeeSearch = false;
  public search: ISearch = {
    nombres: null,
    id_tipo_emp: null,
    ap_paterno: null,
    curp: null,
    ap_materno: null,
    num_empleado: null,
  };
  public consultation: IConsultation = {
    assigmentNumber: null,
    employeeType: null,
    fullname: null,
    employeeTypeId: null,
  };
  public searchResult: Array<ISearchResult> = [];
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

  onSubmit() {
    this.searchResult = [];
    this.isLoadingEmployeeSearch = true;
    this.employeeService
      .search(this.search)
      .then((response) => {
        this.searchResult = response.Data;
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
    employeeTypeId: number
  ) {
    console.log(employeeTypeId);
    this.consultation.assigmentNumber = assignmentNumber;
    this.consultation.fullname = names + " " + lastname + " " + surname;
    this.consultation.employeeType = employeeType;
    this.consultation.employeeTypeId = employeeTypeId;

    this.$store.dispatch("consultation/setConsultationData", this.consultation);
    this.$router.push({ path: "/empleados/consulta" });
  }

  mounted() {
    // Métodos
    this.getEmployeeTypes();

    // Validaciones personalizadas
    // extend("numeric", {
    //   ...numeric,
    //   message: `{_field_} ${this.$t(
    //     "searchEmployee.search.validationsForm.isNumeric"
    //   )}`,
    // });

    // extend("max", (value, args: any) => {
    //   if (value.length <= args[0]) {
    //     return true;
    //   }
    //   return `{_field_} ${this.$t(
    //     "searchEmployee.search.validationsForm.max"
    //   )} ${args[0]}`;
    // });
  }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>
