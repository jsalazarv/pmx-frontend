<template>
  <v-dialog
    v-model="isDialogOpen"
    persistent
    max-width="750"
    scrollable
    class="mx-2"
  >
    <v-card>
      <v-card-title class="text-h6" v-if="title">
        {{ title }}
      </v-card-title>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Ficha</th>
              <th>Nombres</th>
              <th>Apellido paterno</th>
              <th>Apellido materno</th>
              <th>Sexo</th>
              <th>Fecha de nacimiento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CONFIRMAR DATO</td>
              <td>{{ mfeData.Nombres }}</td>
              <td>{{ mfeData.ApellidoPaterno }}</td>
              <td>{{ mfeData.ApellidoPaterno }}</td>
              <td>{{ mfeData.Sexo }}</td>
              <td>{{ mfeData.FechaNacimiento }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-text>
        Debe proporcionar la información que de soporte al rechazo o aceptación.
        Se generará de asignación al momento de Genera número de asignación.

        <v-textarea
          name="justification"
          label="Justificacion"
          dense
          outlined
          required
          v-model="confirmation.Justificacion"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          elevation="0"
          @click="confirmData"
          :disabled="!confirmation.Justificacion"
        >
          {{ $t("dictionary.confirm") }}
        </v-btn>
        <v-btn color="error darken-1" text @click="rejectData">
          {{ $t("dictionary.reject") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit, Prop, PropSync } from "vue-property-decorator";
import { IMfeData } from "@/services/EmployeeService/types";
import { IConfirmForm, IEmployeeForm } from "@/store/employee/types";

@Component({})
export default class ConfirmUseExistingEmployeeDialog extends Vue {
  get confirmationLog(): IConfirmForm {
    return this.$store.state.employees.confirmation;
  }

  @Prop()
  public title?: string;

  @Prop()
  public mfeData!: IMfeData;

  @Prop()
  public renapoData!: Partial<IEmployeeForm>;

  @PropSync("open")
  public isDialogOpen!: boolean;

  public onReject!: () => void;
  public onCancel!: () => void;
  public onConfirm!: () => void;

  get confirmation(): IConfirmForm {
    return this.$store.state.employees.confirmation;
  }

  @Emit("onCancel")
  cancel(): void {
    if (this.onCancel) {
      this.onCancel();
    }
    this.closeDialog();
  }

  @Emit("onConfirm")
  confirmData(): void {
    this.selectDataRenapo();
    this.$store.dispatch("employees/setConfirmation", {
      confirmar: true,
    });
    if (this.onConfirm) {
      this.onConfirm();
    }
    this.closeDialog();
  }

  @Emit("onReject")
  rejectData(): void {
    this.saveTryInLogbook();
    if (this.onReject) {
      this.onReject();
    }
    this.closeDialog();
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  selectDataRenapo(): void {
    this.$store.dispatch("employees/setEmployeeData", this.renapoData);
  }

  saveTryInLogbook(): void {
    // TODO: REQUEST TO SAVE IN LOGBOOK
  }
}
</script>

<style scoped></style>
