<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employee.create.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <ValidationObserver ref="form">
          <employee-search-form />
          <employment-information-form />
          <location-form />
          <v-container>
            <v-btn color="success" @click="registerEmployee">
              {{ $t("employee.labels.generateAssignmentNumber") }}
            </v-btn>
          </v-container>
        </ValidationObserver>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import EmployeeSearchForm from "@/views/mfe/employee/components/EmployeeSearchForm.vue";
import EmploymentInformationForm from "@/views/mfe/employee/components/EmploymentInformationForm.vue";
import LocationForm from "@/views/mfe/employee/components/LocationForm.vue";
import EmployeeService from "@/services/EmployeeService";

@Component({
  components: {
    EmployeeSearchForm,
    LocationForm,
    EmploymentInformationForm,
  },
})
export default class PeopleCreate extends Vue {
  protected employeeService = new EmployeeService();

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  createEmployee(): void {
    const data = {
      ...this.$store.state.employees.employee,
      ...this.$store.state.employees.employmentData,
      ...this.$store.state.employees.address,
      ...this.$store.state.employees.confirmation,
    };

    this.employeeService
      .create(data)
      .then((response) => {
        //TODO: Success message
        console.log("Data POST: ", response);
      })
      .finally();
  }

  async registerEmployee(): Promise<void> {
    //await (this.$refs.form as IValidationObserver).validate();
    this.createEmployee();
  }
}
</script>
