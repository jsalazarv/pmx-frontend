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
            v-model="person.curp"
        ></v-text-field>
        <v-btn color="success" @click="search">VALIDAR</v-btn>
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
            v-model="person.nombres"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Apellido paterno"
            outlined
            required
            v-model="person.apellidoPaterno"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Apellido materno"
            outlined
            required
            v-model="person.apellidoMaterno"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Fecha de nacimiento"
            outlined
            required
            v-model="person.fechaNacimiento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field
            dense
            disabled
            label="Sexo"
            outlined
            required
            v-model="person.sexo"
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
import {IEmpleado} from "@/store/people/types";

@Component({})
export default class RenapoPeopleForm extends Vue {

  get person(): IEmpleado {
    return this.$store.state.empleados.empleado;
  }

  search() {
    this.$store.dispatch("empleados/getEmpleadoPorCurp", this.person.curp)
  }
}
</script>

<style scoped>

</style>