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
import { Component, Prop, PropSync } from "vue-property-decorator";
import EmployeeService from "@/services/EmployeeService";
import { IDeleteEmployeeRequest } from "@/services/EmployeeService/types";

@Component({})
export default class DeleteDialog extends Vue {
  protected employeeService = new EmployeeService();

  @PropSync("open")
  public isDialogOpen!: boolean;

  @Prop({ type: Boolean, default: false })
  isDeleting?: boolean;

  @Prop({ type: Object, default: {} })
  data?: Record<string, unknown>;

  public confirmation = {
    Motivo: "",
  };

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  deleting(): void {
    this.isDialogOpen = !this.isDialogOpen;
  }

  clear(): void {
    this.confirmation.Motivo = "";
  }

  destroy(data: IDeleteEmployeeRequest): void {
    this.deleting();
    const dataForDeletion = {
      ...{ IdEmpleado: data.IdEmpleado },
      ...{ Motivo: this.confirmation.Motivo },
    };
    this.employeeService
      .delete(dataForDeletion)
      .then()
      .finally(() => {
        this.deleting();
        this.clear();
        this.closeDialog();
      });
  }
}
</script>

<style scoped></style>
