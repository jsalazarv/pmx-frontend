<template>
  <v-dialog
    v-model="isDialogOpen"
    :employeeId="employeeId"
    max-width="600"
    :persistent="isGenerating"
  >
    <ValidationObserver v-slot="{ invalid }">
      <v-card>
        <v-card-title class="headline">
          {{ $t("proofAssignment.labels.dialogs.confirmReport.title") }}
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="6">
                <ValidationProvider
                  :name="$t('proofAssignment.attributes.applicantName')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="applicantName"
                    :label="$t('proofAssignment.attributes.applicantName')"
                    outlined
                    required
                    :disabled="isGenerating"
                    v-model="reportApplicants.NombreSolicitante"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider
                  :name="$t('proofAssignment.attributes.applicantPosition')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="applicantPosition"
                    :label="$t('proofAssignment.attributes.applicantPosition')"
                    outlined
                    required
                    :disabled="isGenerating"
                    v-model="reportApplicants.CargoSolicitante"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider
                  :name="$t('proofAssignment.attributes.receiverName')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="receiverName"
                    :label="$t('proofAssignment.attributes.receiverName')"
                    outlined
                    required
                    :disabled="isGenerating"
                    v-model="reportApplicants.NombreReceptor"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider
                  :name="$t('proofAssignment.attributes.receiverPosition')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="receiverPosition"
                    :label="$t('proofAssignment.attributes.receiverPosition')"
                    outlined
                    required
                    :disabled="isGenerating"
                    v-model="reportApplicants.CargoReceptor"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider
                  :name="$t('proofAssignment.attributes.responsibleName')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="responsibleName"
                    :label="$t('proofAssignment.attributes.responsibleName')"
                    outlined
                    required
                    :disabled="isGenerating"
                    v-model="reportApplicants.NombreResponsable"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
              <v-col cols="12" md="6">
                <ValidationProvider
                  :name="$t('proofAssignment.attributes.responsiblePosition')"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    dense
                    name="responsiblePosition"
                    :label="
                      $t('proofAssignment.attributes.responsiblePosition')
                    "
                    outlined
                    required
                    :disabled="isGenerating"
                    v-model="reportApplicants.CargoResponsable"
                    :error-messages="errors"
                  ></v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="light darken-1"
            text
            @click="closeDialog"
            :disabled="isGenerating"
          >
            {{ $t("proofAssignment.labels.cancel") }}
          </v-btn>
          <v-btn
            color="success"
            @click="generateReport"
            :disabled="isGenerating || invalid"
            :loading="isGenerating"
          >
            {{ $t("proofAssignment.labels.generateReport") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </ValidationObserver>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import ReportingService from "@/services/ReportingService";
import { IApplicantsDataReport } from "@/services/ReportingService/types";

const initialReportApplicants = {
  NombreSolicitante: "",
  CargoSolicitante: "",
  NombreReceptor: "",
  CargoReceptor: "",
  NombreResponsable: "",
  CargoResponsable: "",
};

@Component({})
export default class ApplicantsDialog extends Vue {
  protected reportingService = new ReportingService();
  public reportApplicants = { ...initialReportApplicants };
  public isGenerating = false;

  @PropSync("open")
  public isDialogOpen!: boolean;

  @Prop({ type: Number, default: null })
  employeeId?: number;

  closeDialog(): void {
    this.isDialogOpen = false;
    this.clear();
  }

  clear(): void {
    this.reportApplicants = { ...initialReportApplicants };
  }

  generateReport(): void {
    const dataApplicants: IApplicantsDataReport = {
      ...this.reportApplicants,
      idempleado: this.employeeId as number,
    };
    this.isGenerating = true;
    this.reportingService
      .export(dataApplicants)
      .then((response) => {
        const fileURL = URL.createObjectURL(response.data);
        window.open(fileURL, "_blank");
      })
      .catch((error) => {
        //TODO: error for user
        console.log("ERROR", error);
      })
      .finally(() => {
        this.isGenerating = false;
        this.closeDialog();
      });
  }
}
</script>

<style scoped></style>
