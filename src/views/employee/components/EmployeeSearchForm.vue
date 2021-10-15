<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            dense
            :items="employeeTypeList"
            item-text="nombre"
            item-value="id"
            label="Tipo de empledo"
            outlined
            required
            :loading="isLoadingEmployeeList"
            :disabled="isLoadingEmployeeList || isValidatingEmployee"
          ></v-autocomplete>
          <v-text-field
            clearable
            dense
            label="CURP"
            outlined
            required
            v-model="person.curp"
            :disabled="isValidatingEmployee"
            :loading="isValidatingEmployee"
          ></v-text-field>
          <v-btn
            color="success"
            @click="validateCurp"
            :disabled="isValidatingEmployee"
            :loading="isValidatingEmployee"
            >VALIDAR</v-btn
          >
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
      v-model="isDialogOpen"
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
              <v-card elevation="0" outlined>
                <v-card-title class="subheading font-weight-bold">
                  MFE
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Nombres: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.nombres }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido paterno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.apellidoPaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido materno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.apellidoMaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Fecha de nacimiento:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.fechaNacimiento }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sexo: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ mfeData.sexo }}
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
              <v-card elevation="0" outlined>
                <v-card-title class="subheading font-weight-bold">
                  RENAPO
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-item>
                    <v-list-item-content>Nombres: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.nombres }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido paterno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.apellidoPaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Apellido materno:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.apellidoMaterno }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content
                      >Fecha de nacimiento:
                    </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.fechaNacimiento }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>Sexo: </v-list-item-content>
                    <v-list-item-content class="align-end">
                      {{ renapoData.sexo }}
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
import { IPerson } from "@/store/people/types";
import EmployeeTypeService from "@/services/EmployeeTypeService";
import PersonService from "@/services/PersonService";
import { IPersonValidationResponse } from "@/services/PersonService/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";

@Component({})
export default class EmployeeSearchForm extends Vue {
  protected employeeTypesService = new EmployeeTypeService();
  protected personService = new PersonService();
  public employeeTypeList: Array<IEmployeeType> = [];
  public isLoadingEmployeeList = false;
  public personValidationData: IPersonValidationResponse | null = null;
  public isValidatingEmployee = false;
  public isDialogOpen = false;

  get person(): IPerson {
    return this.$store.state.people.person;
  }

  get dataTypesOfEmployee(): IEmployeeType {
    return this.$store.state.people.typesOfEmployees;
  }

  get mfeData(): Partial<IPerson> {
    return {
      nombres: this.personValidationData?.mfe.nombres,
      apellidoPaterno: this.personValidationData?.mfe.apellidoPaterno,
      apellidoMaterno: this.personValidationData?.mfe.apellidoMaterno,
      fechaNacimiento: this.personValidationData?.mfe.fechaNacimiento,
      sexo: this.personValidationData?.mfe.sexo,
    };
  }

  get renapoData(): Partial<IPerson> {
    return {
      nombres: this.personValidationData?.renapo.nombres,
      apellidoPaterno: this.personValidationData?.renapo.apellidoPaterno,
      apellidoMaterno: this.personValidationData?.renapo.apellidoMaterno,
      fechaNacimiento: this.personValidationData?.renapo.fechaNacimiento,
      sexo: this.personValidationData?.renapo.sexo,
    };
  }

  validateCurp(): void {
    this.isValidatingEmployee = true;
    this.personService
      .findByCurp(this.person.curp)
      .then((response) => {
        this.personValidationData = response.data.data;
        this.openDialog();
      })
      .finally(() => {
        this.isValidatingEmployee = false;
      });
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  openDialog(): void {
    this.isDialogOpen = true;
  }

  selectDataRenapo(): void {
    this.$store.dispatch("people/setPersonData", this.renapoData);
    this.closeDialog();
    this.personValidationData = null;
  }

  selectDataMFE(): void {
    this.$store.dispatch("people/setPersonData", this.mfeData);
    this.closeDialog();
    this.personValidationData = null;
  }

  getEmployeeTypes(): void {
    this.isLoadingEmployeeList = true;
    this.employeeTypesService
      .getAll()
      .then((response) => {
        this.employeeTypeList = response.data.data;
      })
      .finally(() => {
        this.isLoadingEmployeeList = false;
      });
  }

  mounted(): void {
    this.getEmployeeTypes();
  }
}
</script>

<style scoped></style>
