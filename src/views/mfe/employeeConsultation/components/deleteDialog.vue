<template>
  <v-dialog
    v-model="isDialogOpen"
    :persistent="isDeleting"
    :data="data"
    max-width="600"
  >
    <v-card>
      <v-card-title class="headline">
        {{ $t("employeeConsultationMFE.labels.dialogs.confirmDelete.title") }}
      </v-card-title>
      <v-card-text>
        <p>
          {{
            $t(
              "employeeConsultationMFE.labels.dialogs.confirmDelete.body.label1"
            )
          }}
          <strong>
            {{
              data
                ? `${data.Persona.Nombres} ${data.Persona.ApellidoPaterno} ${data.Persona.ApellidoMaterno}`
                : ""
            }}
          </strong>
          {{
            $t(
              "employeeConsultationMFE.labels.dialogs.confirmDelete.body.label2"
            )
          }}
          <strong>{{ data ? `${data.IdEmpleado}` : "" }}</strong
          >.
        </p>
        <p>
          {{
            $t(
              "employeeConsultationMFE.labels.dialogs.confirmDelete.body.label3"
            )
          }}:
        </p>
        <v-textarea
          name="justification"
          :label="
            $t(
              'employeeConsultationMFE.labels.dialogs.confirmDelete.body.justification'
            )
          "
          dense
          outlined
          required
          v-model="confirmation.Motivo"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="light darken-1"
          :disabled="isDeleting"
          text
          @click="closeDialog"
        >
          {{
            $t(
              "employeeConsultationMFE.labels.dialogs.confirmDelete.actions.dismiss"
            )
          }}
        </v-btn>
        <v-btn
          color="red darken-1"
          :loading="isDeleting"
          :disabled="isDeleting || !confirmation.Motivo"
          text
          @click="destroy(data)"
        >
          {{
            $t(
              "employeeConsultationMFE.labels.dialogs.confirmDelete.actions.accept"
            )
          }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Emit, Prop, PropSync } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import { ICreateEmployeeResponse } from "@/services/EmployeeService/types";

@Component({})
export default class DeleteDialog extends Vue {
  protected employeeService = new EmployeeService();
  public isDeleting = false;
  public confirmation = {
    Motivo: "",
  };

  @PropSync("open")
  public isDialogOpen!: boolean;

  @Prop({ type: Object, default: {} })
  data?: ICreateEmployeeResponse;

  onDelete(data: ICreateEmployeeResponse): void {
    this.isDeleting = false;
    this.clear();
    this.closeDialog();
    this.$emit("onDelete", data);
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  clear(): void {
    this.confirmation.Motivo = "";
  }

  destroy(data: ICreateEmployeeResponse): void {
    this.isDeleting = true;
    const dataForDeletion = {
      ...{ IdEmpleado: data.IdEmpleado },
      ...{ Motivo: this.confirmation.Motivo },
    };
    this.employeeService
      .delete(dataForDeletion)
      .then()
      .finally(() => {
        this.onDelete(data);
      });
  }
}
</script>

<style scoped></style>
