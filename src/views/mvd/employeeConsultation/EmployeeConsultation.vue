<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
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
          <v-col cols="12" sm="12" md="12">
            <Alert
              :message="alert.message"
              :alert="alert.alert"
              :type="alert.type"
              @hideAlert="hideAlert"
            ></Alert>
          </v-col>
          <EmployeeFormData
            v-if="consultationEmployee.consultation.employeeTypeId == 0"
          />
          <EmployeeForm v-else />
        </v-container>
        <v-divider></v-divider>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="sizeTextButton"
                type="submit"
                color="success"
                dark
                large
                dense
                @click="onBtnEditAddress"
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.editAddress"
                  )
                }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="sizeTextButton"
                type="button"
                color="success"
                dark
                large
                dense
                @click="onBtnNewAddress"
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.newAddress"
                  )
                }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-dialog v-model="dialog" persistent max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
                    Open Dialog
                  </v-btn> -->
                  <v-btn
                    class="sizeTextButton"
                    type="button"
                    color="success"
                    large
                    dark
                    dense
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{
                      $t(
                        "employeeConsultation.consultation.actionsButtons.assignMedicalUnit"
                      )
                    }}
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    {{
                      $t(
                        "employeeConsultation.consultation.actionsButtons.assignMedicalUnit"
                      )
                    }}
                  </v-card-title>
                  <v-col cols="12" sm="12" md="12">
                    <v-autocomplete
                      dense
                      name="medicalUnit"
                      outlined
                      item-text="Nombre"
                      item-value="Id"
                      :items="medicalUnitsList"
                      :label="
                        $t(
                          'employeeConsultation.consultation.assignMedicalUnit.medicalUnit'
                        )
                      "
                      :disabled="isLoadingMedicalUnitsList"
                      :loading="isLoadingMedicalUnitsList"
                    ></v-autocomplete>
                  </v-col>

                  <!--
                    v-model="beneficiary.medicalUnit"
                    :error-messages="errors"
                     :items="countries"
                    :disabled="isLoadingCountries"
                      :loading="isLoadingCountries"
                      v-model="address.IdPais"
                      @change="getStates"
                      :error-messages="errors"
                     <v-card-text
                    >Let Google help apps determine location. This means sending
                    anonymous location data to Google, even when no apps are
                    running.</v-card-text
                  > -->

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialog = false">
                      {{
                        $t(
                          "employeeConsultation.consultation.actionsButtons.cancel"
                        )
                      }}
                    </v-btn>
                    <v-btn
                      color="success"
                      dark
                      dense
                      @click="dialog = false"
                    >
                      {{
                        $t(
                          "employeeConsultation.consultation.actionsButtons.assign"
                        )
                      }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <!-- <v-btn
                class="sizeTextButton"
                type="button"
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
              </v-btn> -->
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                :disabled="disabledCredential"
                class="colorCredentialButton sizeTextButton"
                type="button"
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
            {{ $t("employeeConsultation.consultation.titleSecondary") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3" offset-md="9">
              <v-btn
                class="sizeTextButton"
                type="button"
                dark
                dense
                large
                color="success"
                @click="onBtnAddBeneficiary"
              >
                +
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.addBeneficiary"
                  )
                }}
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
import BeneficiaryService from "@/services/BeneficiaryService/";
import EmployeeService from "@/services/EmployeeService";
import {
  IBeneficiary,
  ITitularBeneficiaryRequest,
} from "@/services/BeneficiaryService/types";
import EmployeeFormData from "./components/EmployeeFormData.vue";
import EmployeeForm from "./components/EmployeeForm.vue";
import Alert from "@/components/Alert.vue";
import { IMedicalUnit } from "@/services/MedicalUnitService/types";
import MedicalUnitService from "@/services/MedicalUnitService";

@Component({ components: { EmployeeFormData, EmployeeForm, Alert } })
export default class EmployeeConsultation extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  protected employeeService = new EmployeeService();
  protected medicalUnitService = new MedicalUnitService();
  public medicalUnitsList: Array<IMedicalUnit> = [];
  public beneficiaries: Array<any> = [];
  public disabledCredential = false;
  public dialog = false;
  public isLoadingMedicalUnitsList = false;
  public titularBeneficiary: ITitularBeneficiaryRequest = {
    IdPersona: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
  };
  public alert = {
    alert: false,
    message: "",
    type: false,
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

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  onBtnEditAddress(): void {
    this.$router.push({ name: "address:editAddress" });
  }

  onBtnNewAddress(): void {
    this.$router.push({ name: "address:newAddress" });
  }

  onBtnAddBeneficiary(): void {
    this.$router.push({ name: "beneficiary:newBeneficiary" });
  }

  onBtnCredentialization(): void {
    this.$router.push({ name: "credentialization:credentialization" });
  }

  getAllBeneficiaries(): void {
    this.beneficiaries = this.beneficiaryService.getAll(
      this.consultationEmployee.consultation.assigmentNumber
    );
  }

  onBtnEdit(): void {
    this.$router.push({
      path: "/derechohabiente/editar/",
      query: { id: "1" },
    });
  }

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
  }

  validity(): void {
    if (!this.consultationEmployee.consultation.validityStatus) {
      this.alert = {
        message: "El empleado no encuentra se actualmente vigente", //this.$t("address.address.messages.success") as string,
        alert: true,
        type: false,
      };
      console.log(this.disabledCredential);
      this.disabledCredential = true;
    }
  }

  getMedicalUnits(): void {
    this.isLoadingMedicalUnitsList = true;
    this.medicalUnitService
      .getAll()
      .then((response) => {
        this.medicalUnitsList = response.Data;
      })
      .finally(() => {
        this.isLoadingMedicalUnitsList = false;
      });
  }

  mounted(): void {
    if (this.consultationEmployee.consultation.assigmentNumber == null) {
      this.$router.push({
        name: "mvd:people:searchEmployee",
      });
    }
    this.getMedicalUnits();
    this.validity();
    this.getAllBeneficiaries();
  }

  // created() {

  //   window.addEventListener("beforeunload", (event) => {
  //     event.returnValue = "";
  //   });
  // }
}
</script>

<style scoped>
.colorCredentialButton {
  background-color: #660033 !important;
}

.sizeTextButton {
  font-size: 11px !important;
  width: 240px !important;
  color: white;
}
</style>
