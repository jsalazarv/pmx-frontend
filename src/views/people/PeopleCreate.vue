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
        <renapo-people-form />
        <employment-information-form />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import RenapoPeopleForm from "@/views/people/components/RenapoPeopleForm.vue";
import { IStoreEmpleados } from "@/store/people/types";
import EmploymentInformationForm from "@/views/people/components/EmploymentInformationForm.vue";
@Component({
  components: { EmploymentInformationForm, RenapoPeopleForm },
})
export default class PeopleCreate extends Vue {
  get isLoading(): IStoreEmpleados {
    return this.$store.state.empleados.isLoading;
  }
}
</script>
