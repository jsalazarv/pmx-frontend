<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.employeeType'
            )
          "
          name="employeeType"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.employeeType"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.assignmentNumber'
            )
          "
          name="assignmentNumber"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.assigmentNumber"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="2">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.groupPersonal'
            )
          "
          name="groupPersonal"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.groupPersonal"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="2">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.areaPersonal'
            )
          "
          name="areaPersonal"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.areaPersonal"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.fullname'
            )
          "
          name="fullname"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.fullname"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="4">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.departmentCenter'
            )
          "
          name="departmentCenter"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.departmentCenter"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="8">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.departmentDescription'
            )
          "
          name="departmentDescription"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.departmentDescription"
        >
        </v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.validity'
            )
          "
          name="validity"
          dense
          outlined
          disabled
          :value="consultationEmployee.consultation.validity"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          :label="
            $t(
              'employeeConsultation.consultation.employeeConsultationForm.validityStatus'
            )
          "
          name="validityStatus"
          dense
          outlined
          disabled
          :value="computedValidity"
        >
        </v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IConsultationState } from "@/store/consultation/types";

@Component({})
export default class EmployeeFormData extends Vue {
  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  get computedValidity(): string {
    return this.consultationEmployee.consultation.validityStatus
      ? `${this.$t(
          "employeeConsultation.consultation.employeeConsultationForm.valid"
        )}`
      : `${this.$t(
          "employeeConsultation.consultation.employeeConsultationForm.notValid"
        )}`;
  }
}
</script>
