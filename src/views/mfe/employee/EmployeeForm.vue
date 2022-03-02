<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("employee.create.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <ValidationObserver ref="form" v-slot="{ invalid }">
          <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">
                Información personal
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">
                Name of step 2
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">
                Name of step 3
              </v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step step="4"> Name of step 4 </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <employee-search-form />
                <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
                <v-btn text> Cancel </v-btn>
              </v-stepper-content>
              <v-stepper-content step="2">
                <employment-information-form />
                <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
                <v-btn text> Cancel </v-btn>
              </v-stepper-content>
              <v-stepper-content step="3">
                <location-form />
                <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>
                <v-btn text> Cancel </v-btn>
              </v-stepper-content>
              <v-stepper-content step="4">
                <contact-form />
                <v-btn
                  color="success"
                  @click="registerEmployee"
                  :disabled="invalid || isCreating"
                  :loading="isCreating"
                >
                  {{ $t("employee.labels.generateAssignmentNumber") }}
                  <v-icon right dark>mdi-plus-thick</v-icon>
                </v-btn>
                <v-btn text> Cancel </v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
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
import { IValidationObserver } from "@/components/types";
import ContactForm from "@/views/mfe/employee/components/ContactForm.vue";

@Component({
  components: {
    ContactForm,
    EmployeeSearchForm,
    LocationForm,
    EmploymentInformationForm,
  },
})
export default class PeopleCreate extends Vue {
  protected employeeService = new EmployeeService();

  public isCreating = false;
  public e1 = 1;

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
      Contactos: this.$store.state.employees.contacts,
    };

    this.employeeService
      .create(data)
      .then((response) => {
        this.isCreating = true;
        if (response.Success) {
          this.$store.dispatch("app/setNotify", {});
        }
      })
      .catch((err) => {
        if (err.response) {
          this.$store.dispatch("app/setNotify", {
            status: err?.response?.status,
            text: err?.response?.data?.Message?.Texto,
          });
          console.error(err?.response);
        }
      })
      .finally(() => {
        (this.$refs.form as IValidationObserver).reset();
        this.$store.dispatch("employees/clear");
        this.isCreating = false;
      });
  }

  async registerEmployee(): Promise<void> {
    //await (this.$refs.form as IValidationObserver).validate();
    this.createEmployee();
  }
}
</script>
