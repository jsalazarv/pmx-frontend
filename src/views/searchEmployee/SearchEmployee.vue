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
          <ValidationObserver ref="form">
            <form @submit.prevent="onSubmit">
              <v-row>
                <ValidationObserver>
                  <ValidationProvider
                    name="email"
                    rules="required|email"
                    v-slot="{ errors }"
                  >
                    <input v-model="email" type="text" placeholder="email" />
                    <span>{{ errors[0] }}</span>
                  </ValidationProvider>
                </ValidationObserver>
                <v-col cols="12" sm="12" md="3">
                  <v-autocomplete
                    dense
                    name="typeOfEmployee"
                    :items="employeeTypeList"
                    item-text="Nombre"
                    item-value="Id"
                    :label="$t('searchEmployee.search.searchForm.employeeType')"
                    outlined
                    required
                  ></v-autocomplete>
                </v-col>

                <v-col cols="12" sm="12" md="5" offset-md="2">
                  <v-text-field
                    :label="$t('searchEmployee.search.searchForm.names')"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="3">
                  <v-text-field label="CURP" dense outlined> </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="5" offset-md="2">
                  <v-text-field
                    :label="$t('searchEmployee.search.searchForm.lastname')"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="12" md="3">
                  <v-text-field label="Número de asignación" dense outlined>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="5" offset-md="2">
                  <v-text-field
                    :label="$t('searchEmployee.search.searchForm.surname')"
                    dense
                    outlined
                  >
                  </v-text-field>
                </v-col>

                <v-col cols="12" sm="12" md="2">
                  <div class="my-2">
                    <v-btn
                     type="submit"
                      color="success"
                      dark
                      large
                      dense
                    >
                      Buscar
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>

          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-data-table
                :headers="headers"
                :items="desserts"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>
                      <v-btn class="mx-2" @click="onButtonClick(row.item)">
                        <v-icon dark>mdi-eye</v-icon>
                      </v-btn>
                    </td>
                    <td>{{ row.item.employeeType }}</td>
                    <td>{{ row.item.names }}</td>
                    <td>{{ row.item.lastname }}</td>
                    <td>{{ row.item.surname }}</td>
                    <td>{{ row.item.curp }}</td>
                    <td>{{ row.item.assignmentNumber }}</td>
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
import EmployeeTypeService from "@/services/EmployeeTypeService";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class SearchEmployee extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  public employeeTypeList: Array<IEmployeeType> = [];

  public headers: Array<any> = [
    { text: "", value: "actions", sortable: false },
    {
      text: this.$t("searchEmployee.search.searchForm.employeeType"),
      align: "start",
      sortable: false,
      value: "employeeType",
    },
    { text: this.$t("searchEmployee.search.searchForm.names"), value: "names" },
    {
      text: this.$t("searchEmployee.search.searchForm.lastname"),
      value: "lastname",
    },
    {
      text: this.$t("searchEmployee.search.searchForm.surname"),
      value: "surname",
    },
    { text: this.$t("searchEmployee.search.searchForm.curp"), value: "curp" },
    {
      text: this.$t("searchEmployee.search.searchForm.assignmentNumber"),
      value: "assignmentNumber",
    },
  ];

  public desserts: Array<any> = [];

  getEmployeeTypes(): void {
    //this.isLoadingEmployeeList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.Data;
        console.log(this.employeeTypeList);
      })
      .finally(() => {
        console.log("entra");
        //this.isLoadingEmployeeList = false;
      });
  }

  obtenerArreglo(): void {
    this.desserts = [
      {
        employeeType: "Trabajador PEMEX",
        names: "Gabriela",
        lastname: "Sandoval",
        surname: "Urvan",
        curp: "SAUG770329MDFNRB02",
        assignmentNumber: "372111",
      },
      {
        employeeType: "Trabajador PEMEX",
        names: "Gabriela",
        lastname: "Sandoval",
        surname: "Urvan",
        curp: "SAUG770329MDFNRB02",
        assignmentNumber: "372111",
      },
      {
        employeeType: "Trabajador PEMEX",
        names: "Gabriela",
        lastname: "Sandoval",
        surname: "Urvan",
        curp: "SAUG770329MDFNRB02",
        assignmentNumber: "372111",
      },
      {
        employeeType: "Trabajador PEMEX",
        names: "Gabriela",
        lastname: "Sandoval",
        surname: "Urvan",
        curp: "SAUG770329MDFNRB02",
        assignmentNumber: "372111",
      },
      {
        employeeType: "Trabajador PEMEX",
        names: "Gabriela",
        lastname: "Sandoval",
        surname: "Urvan",
        curp: "SAUG770329MDFNRB02",
        assignmentNumber: "372111",
      },
      {
        employeeType: "Trabajador PEMEX",
        names: "Gabriela",
        lastname: "Sandoval",
        surname: "Urvan",
        curp: "SAUG770329MDFNRB02",
        assignmentNumber: "372111",
      },
    ];
  }

  mounted() {
    this.getEmployeeTypes();
  }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>
