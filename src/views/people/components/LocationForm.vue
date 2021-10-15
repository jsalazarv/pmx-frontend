<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-autocomplete
            dense
            :items="dataAllCountries"
            item-text="nombre"
            item-value="id"
            label="País"
            outlined
            required
          ></v-autocomplete>
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
import { ICountries } from "@/store/people/types";

@Component({})
export default class LocationForm extends Vue {
  get dataAllCountries(): ICountries {
    return this.$store.state.people.countries;
  }

  countries(): void {
    this.$store.dispatch("people/getCountries", this.dataAllCountries);
  }
  mounted(): void {
    this.countries();
  }
}
</script>

<style scoped></style>
