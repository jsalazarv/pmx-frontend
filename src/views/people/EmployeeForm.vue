<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title> Alta </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <employee-search-form />
        <employment-information-form />
        <location-form />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import EmployeeSearchForm from "@/views/people/components/EmployeeSearchForm.vue";
import EmploymentInformationForm from "@/views/people/components/EmploymentInformationForm.vue";
import LocationForm from "@/views/people/components/LocationForm.vue";

@Component({
  components: {
    EmployeeSearchForm,
    LocationForm,
    EmploymentInformationForm,
  },
})
export default class PeopleCreate extends Vue {
  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>
