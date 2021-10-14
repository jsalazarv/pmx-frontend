<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete dense label="País" outlined required></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Código postal"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
            label="Estado"
            outlined
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Colonia"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
            label="Municipio/Localidad"
            outlined
            required
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Calle"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            clearable
            dense
            label="Núm. interior"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="2">
          <v-text-field
            clearable
            dense
            label="Núm. exterior"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Manzana"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            clearable
            dense
            label="Lote"
            outlined
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class LocationForm extends Vue {}
</script>

<style scoped></style>
