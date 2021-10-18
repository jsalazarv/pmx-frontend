<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Referencia"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Empresa/Organismo solicitante"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Centro de trabajo solicitante"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Descripción del centro de trabajo solicitante"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
            label="Sindicato"
            outlined
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Sección sindical"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="Observaciones"
            auto-grow
            outlined
            rows="5"
            row-height="20"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component({})
export default class EmploymentInformationForm extends Vue {}
</script>

<style scoped></style>
