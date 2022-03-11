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
        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              {{ $t("employee.labels.steps.personalInformation") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">
              {{ $t("employee.labels.steps.workingInformation") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">
              {{ $t("employee.labels.steps.address") }}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">
              {{ $t("employee.labels.steps.contact") }}
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <v-stepper-content step="1">
                <employee-search-form />
                <v-btn text @click="clear">
                  {{ $t("employee.labels.cancel") }}
                </v-btn>
                <v-btn @click="e1 = 2" :disabled="invalid">
                  {{ $t("employee.labels.continue") }}
                  <v-icon right dark>mdi-skip-forward</v-icon>
                </v-btn>
              </v-stepper-content>
            </ValidationObserver>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <v-stepper-content step="2">
                <employment-information-form />
                <v-btn text @click="goBack()">
                  <v-icon left dark>mdi-skip-backward</v-icon>
                  {{ $t("employee.labels.back") }}
                </v-btn>
                <v-btn text @click="clear">
                  {{ $t("employee.labels.cancel") }}
                </v-btn>
                <v-btn @click="e1 = 3" :disabled="invalid">
                  {{ $t("employee.labels.continue") }}
                  <v-icon right dark>mdi-skip-forward</v-icon>
                </v-btn>
              </v-stepper-content>
            </ValidationObserver>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <v-stepper-content step="3">
                <location-form />
                <v-btn text @click="goBack()">
                  <v-icon left dark>mdi-skip-backward</v-icon>
                  {{ $t("employee.labels.back") }}
                </v-btn>
                <v-btn text @click="clear">
                  {{ $t("employee.labels.cancel") }}
                </v-btn>
                <v-btn @click="e1 = 4" :disabled="invalid">
                  {{ $t("employee.labels.continue") }}
                  <v-icon right dark>mdi-skip-forward</v-icon>
                </v-btn>
              </v-stepper-content>
            </ValidationObserver>
            <ValidationObserver ref="form" v-slot="{ invalid }">
              <v-stepper-content step="4">
                <contact-form />
                <v-btn text @click="goBack()" :disabled="invalid || isCreating">
                  <v-icon left dark>mdi-skip-backward</v-icon>
                  {{ $t("employee.labels.back") }}
                </v-btn>
                <v-btn text @click="clear" :disabled="invalid || isCreating">
                  {{ $t("employee.labels.cancel") }}
                </v-btn>
                <v-btn
                  color="success"
                  @click="registerEmployee"
                  :disabled="invalid || isCreating"
                  :loading="isCreating"
                >
                  {{ $t("employee.labels.generateAssignmentNumber") }}
                  <v-icon right dark>mdi-plus-thick</v-icon>
                </v-btn>
              </v-stepper-content>
            </ValidationObserver>
          </v-stepper-items>
        </v-stepper>
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

    this.isCreating = true;
    this.employeeService
      .create(data)
      .then((response) => {
        if (response.Success) {
          (this as any).ok();
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
        (this.$refs.form as IValidationObserver).reset();
        this.$store.dispatch("employees/clear");
        this.isCreating = false;
        this.$router.push({
          name: "people:list",
        });
      });
  }

  clear(): void {
    this.$store.dispatch("employees/clear");
    this.e1 = 1;
  }

  goBack(): void {
    this.e1--;
  }

  async registerEmployee(): Promise<void> {
    //await (this.$refs.form as IValidationObserver).validate();
    this.createEmployee();
  }
}
</script>
