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
              <th>
                {{ $t("employee.labels.dialogs.existingEmployee.record") }}
              </th>
              <th>
                {{ $t("employee.labels.dialogs.existingEmployee.names") }}
              </th>
              <th>
                {{ $t("employee.labels.dialogs.existingEmployee.lastname") }}
              </th>
              <th>
                {{ $t("employee.labels.dialogs.existingEmployee.surname") }}
              </th>
              <th>
                {{ $t("employee.labels.dialogs.existingEmployee.gender") }}
              </th>
              <th>
                {{ $t("employee.labels.dialogs.existingEmployee.birthday") }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {{
                  $t(
                    "employee.labels.dialogs.existingEmployee.labels.confirmData"
                  )
                }}
              </td>
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
        {{
          $t("employee.labels.dialogs.existingEmployee.labels.informationText")
        }}

        <v-textarea
          name="justification"
          :label="
            $t('employee.labels.dialogs.existingEmployee.labels.justification')
          "
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
          {{ $t("employee.labels.dialogs.existingEmployee.labels.confirm") }}
        </v-btn>
        <v-btn
          color="error darken-1"
          text
          @click="rejectData"
          :disabled="!confirmation.Justificacion"
        >
          {{ $t("employee.labels.dialogs.existingEmployee.labels.reject") }}
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
import EmployeeService from "@/services/EmployeeService";

@Component({})
export default class ConfirmUseExistingEmployeeDialog extends Vue {
  protected employeeService = new EmployeeService();

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

  get employee(): IEmployeeForm {
    return this.$store.state.employees.employee;
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
    const data = {
      ...{ IdTipoEmpleado: this.employee.IdTipoEmpleado },
      ...{ Curp: this.employee.Curp },
      ...{ Justificacion: this.confirmation.Justificacion },
    };

    this.employeeService
      .reject(data)
      .then((response) => {
        if (response.Success) {
          (this as any).ok();
        }
      })
      .catch((err) => {
        if (err.response) {
          (this as any).CustomError(err?.response?.status)
          console.error(err?.response?.status);
        }
      })
      .finally(() => {
        //TODO: Final action
        console.log("Final action");
      });
  }
}
</script>

<style scoped></style>
