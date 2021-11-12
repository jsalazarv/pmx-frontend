<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employeeConsultation.consultation.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container> hshshshs </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IConsultation } from "@/store/consultation/types";

@Component({})
export default class Beneficiary extends Vue {
  get consultationEmployee(): IConsultation {
    return this.$store.state.consultation;
  }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>

<style scoped></style>
