<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-select
            dense
            label="Tipo de empledo"
            outlined
            required
        ></v-select>
        <v-text-field
            clearable
            dense
            label="CURP"
            outlined
            required
        ></v-text-field>
        <v-btn color="success">VALIDAR</v-btn>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
            dense
            disabled
            label="Número de asignación"
            outlined
            required
        ></v-text-field>
        <v-text-field
            dense
            disabled
            label="Estado de número de asignación"
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Nombres"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Apellido paterno"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Apellido materno"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Fecha de nacimiento"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Sexo"
            outlined
            required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="RFC"
            outlined
            required
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Component from "vue-class-component";
import {Vue} from "vue-property-decorator";

@Component({
  name: "PeopleForm"
})

export default class PeopleForm extends Vue {}
</script>

<style scoped>

</style>