<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employeeConsultation.consultation.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        {{ consultationEmployee }}
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
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                :label="
                  $t(
                    'employeeConsultation.consultation.employeeConsultationForm.rc'
                  )
                "
                name="rc"
                dense
                outlined
                disabled
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
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
                    'employeeConsultation.consultation.employeeConsultationForm.department'
                  )
                "
                name="department"
                dense
                outlined
                disabled
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
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="sizeTextButton"
                type="submit"
                color="success"
                dark
                large
                dense
                @click="onBtnAddAddress"
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.manageAddresses"
                  )
                }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="sizeTextButton"
                type="submit"
                color="success"
                dark
                large
                dense
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.assignAddress"
                  )
                }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="sizeTextButton"
                type="submit"
                color="success"
                large
                dark
                dense
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.assignMedicalUnit"
                  )
                }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="colorCredentialButton sizeTextButton"
                type="submit"
                dark
                dense
                large
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.credential"
                  )
                }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employeeConsultation.consultation.secondTitle") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3" offset-md="9">
              <v-btn
                class="sizeTextButton"
                type="submit"
                dark
                dense
                large
                color="success"
                @click="onBtnAddBeneficiary"
              >
                + Agregar derechohabiente
              </v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-data-table
                :headers="headers"
                :items="beneficiaries"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>
                      <v-btn class="mx-2" @click="onBtnEdit">
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-btn class="mx-2">
                        <v-icon dark>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                    <td>{{ row.item.nombres }}</td>
                    <td>{{ row.item.apellido_paterno }}</td>
                    <td>{{ row.item.apellido_materno }}</td>
                    <td>{{ row.item.curp }}</td>
                    <td>{{ row.item.codificacion }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { IConsultationState } from "@/store/consultation/types";
import { IConsultationResult } from "@/services/EmployeeService/types";
import BeneficiaryService from "@/services/BeneficiaryService/";
import EmployeeService from "@/services/EmployeeService";
import { params } from "vee-validate/dist/types/rules/alpha";

@Component({})
export default class EmployeeConsultation extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  protected employeeService = new EmployeeService();
  public consultationResult: IConsultationResult = {
    RC: "",
    descripcion: "",
    centro_depto: "",
    vigencia: "",
    estado_vigencia: "",
  };

  public headers: Array<any> = [
    { text: "", value: "edit", sortable: false },
    { text: "", value: "delete", sortable: false },
    {
      text: this.$t(
        "employeeConsultation.consultation.beneficiariesTable.names"
      ),
      value: "nombres",
    },
    {
      text: this.$t(
        "employeeConsultation.consultation.beneficiariesTable.lastname"
      ),
      value: "ap_paterno",
    },
    {
      text: this.$t(
        "employeeConsultation.consultation.beneficiariesTable.surname"
      ),
      value: "ap_materno",
    },
    {
      text: this.$t(
        "employeeConsultation.consultation.beneficiariesTable.curp"
      ),
      value: "curp",
    },
    {
      text: this.$t(
        "employeeConsultation.consultation.beneficiariesTable.relationship"
      ),
      value: "parentesco",
    },
  ];
  public beneficiaries: Array<any> = [];

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  onBtnAddBeneficiary() {
    this.$router.push({ path: "/derechohabiente/alta" });
  }

  onBtnAddAddress() {
    this.$router.push({ path: "/domicilio/alta" });
  }

  getAllBeneficiaries(assigmentNumber: number | null): void {
    // this.employeeTypesService .getAll() .then((response) => { this.employeeTypeList
    // = response.Data; }) .finally(() => { this.isLoadingEmployeeList = false; });
    this.beneficiaries = this.beneficiaryService.getAll(assigmentNumber);
  }

  getEmployeeConsultation(assigmentNumber: number | null): void {
    this.consultationResult = this.employeeService.consultation(
      assigmentNumber
    );
  }

  onBtnEdit() {
    this.$router.push({
      path: "/derechohabiente/editar/",
      query: { id: "1" },
    });
  }

  mounted() {
    this.getAllBeneficiaries(
      this.consultationEmployee.consultation.assigmentNumber
    );
  }

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }
}
</script>

<style scoped>
.colorCredentialButton {
  background-color: #660033 !important;
}

.sizeTextButton {
  font-size: 11px !important;
  width: 240px !important;
}
</style>
