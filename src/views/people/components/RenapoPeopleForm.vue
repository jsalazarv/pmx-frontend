<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            dense
            :items="dataTypesOfEmployee"
            item-text="nombre"
            item-value="id"
            label="Tipo de empledo"
            outlined
            required
          ></v-autocomplete>
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
          <v-text-field dense label="RFC" outlined required></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="dialog"
      persistent
      max-width="750"
      scrollable
      class="mx-2"
    >
      <v-card>
        <v-card-title class="text-h6"> Lorem Ipsum </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-card v-if="dataMFE" elevation="0" outlined>
                <v-card-title class="subheading font-weight-bold">
                  MFE
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Nombres: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataMFE.nombres }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido paterno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataMFE.apellidoPaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido materno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataMFE.apellidoMaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Fecha de nacimiento:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataMFE.fechaNacimiento }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sexo: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataMFE.sexo }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>
                  <div class="text-right">
                    <v-btn color="success" elevation="0" @click="selectDataMFE">
                      SELECCIONAR
                    </v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
            <v-col cols="12" md="6">
              <v-card v-if="dataRenapo" elevation="0" outlined>
                <v-card-title class="subheading font-weight-bold">
                  RENAPO
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Nombres: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataRenapo.nombres }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido paterno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataRenapo.apellidoPaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido materno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataRenapo.apellidoMaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Fecha de nacimiento:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataRenapo.fechaNacimiento }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sexo: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ dataRenapo.sexo }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>
                  <div class="text-right">
                    <v-btn
                      color="success"
                      elevation="0"
                      @click="selectDataRenapo"
                    >
                      SELECCIONAR
                    </v-btn>
                  </div>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" text @click="closeDialog">
            CANCELAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";
import {
  IEmpleado,
  IEmpleadoMFE,
  IEmpleadoRenapo,
  ITypesOfEmployees,
} from "@/store/people/types";

@Component({})
export default class RenapoPeopleForm extends Vue {
  get person(): IEmpleado {
    return this.$store.state.empleados.empleado;
  }

  get dataRenapo(): IEmpleadoRenapo {
    return this.$store.state.empleados.dataRenapo;
  }

  get dataTypesOfEmployee(): ITypesOfEmployees {
    return this.$store.state.empleados.typesOfEmployees;
  }

  get dataMFE(): IEmpleadoMFE {
    return this.$store.state.empleados.dataMFE;
  }

  get dialog(): boolean {
    return this.$store.state.empleados.dialogOpen;
  }

  search(): void {
    this.$store.dispatch("empleados/getEmpleadoPorCurp", this.person.curp);
  }

  closeDialog(): void {
    this.$store.dispatch("empleados/closeDialog");
  }

  selectDataRenapo(): void {
    this.$store.dispatch("empleados/setEmpleado", this.dataRenapo);
    this.closeDialog();
    this.$store.dispatch("empleados/clearSelectionData");
  }

  selectDataMFE(): void {
    this.$store.dispatch("empleados/setEmpleado", this.dataMFE);
    this.closeDialog();
    this.$store.dispatch("empleados/clearSelectionData");
  }

  typesOfEmployee(): void {
    this.$store.dispatch(
      "empleados/getTiposDeEmpleado",
      this.dataTypesOfEmployee
    );
  }

  mounted(): void {
    this.typesOfEmployee();
  }
}
</script>

<style scoped></style>
