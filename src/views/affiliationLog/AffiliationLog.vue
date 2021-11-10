<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("affiliationLog.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
        </v-toolbar>
        <v-progress-linear></v-progress-linear>
        <v-data-table :items-per-page="5" class="elevation-1"> </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AffiliationLog extends Vue {}
</script>

<style scoped></style>
