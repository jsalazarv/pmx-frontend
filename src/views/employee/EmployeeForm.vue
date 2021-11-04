<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("people.registration.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <ValidationObserver ref="form">
          <employee-search-form />
          <employment-information-form />
          <location-form />
          <v-container>
            <v-btn color="success" @click="registerEmployee">
              {{
                $t(
                  "people.registration.registrationForm.generateAssignmentNumber"
                )
              }}
            </v-btn>
          </v-container>
        </ValidationObserver>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import EmployeeSearchForm from "@/views/employee/components/EmployeeSearchForm.vue";
import EmploymentInformationForm from "@/views/employee/components/EmploymentInformationForm.vue";
import LocationForm from "@/views/employee/components/LocationForm.vue";
import PersonService from "@/services/PersonService";

@Component({
  components: {
    EmployeeSearchForm,
    LocationForm,
    EmploymentInformationForm,
  },
})
export default class PeopleCreate extends Vue {
  protected personService = new PersonService();

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  createEmployee(): void {
    const {
      IdTipoEmpleado,
      Curp,
      Nombres,
      ApellidoPaterno,
      ApellidoMaterno,
      FechaNacimiento,
      Sexo,
      EstadoCivil,
    } = this.$store.state.people.person;

    const {
      Folio,
      Referencia,
      IdCentro,
      IdSeccionSindicato,
      Observaciones,
    } = this.$store.state.people.employmentData;

    const {
      IdMunicipio,
      Localidad,
      CodigoPostal,
      Colonia,
      Calle,
      NumeroInterior,
      NumeroExterior,
      Manzana,
      Lote,
    } = this.$store.state.people.address;

    const data = {
      IdTipoEmpleado,
      Curp,
      Nombres,
      ApellidoPaterno,
      ApellidoMaterno,
      FechaNacimiento,
      Sexo,
      EstadoCivil,
      Folio,
      Referencia,
      IdCentro,
      IdSeccionSindicato,
      Observaciones,
      IdMunicipio,
      Localidad,
      CodigoPostal,
      Colonia,
      Calle,
      NumeroInterior,
      NumeroExterior,
      Manzana,
      Lote,
    };
    this.personService
      .create(data)
      .then((response) => {
        console.log("Data POST: ", response);
      })
      .finally();
  }

  async registerEmployee(): Promise<void> {
    //await (this.$refs.form as IValidationObserver).validate();
    this.createEmployee();
  }
}
</script>
