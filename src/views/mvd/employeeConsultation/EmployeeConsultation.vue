<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("employeeConsultation.info.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container>
          <Alert
            :message="alert.message"
            :alert="alert.alert"
            :type="alert.type"
            @hideAlert="hideAlert"
          ></Alert>
          <EmployeeFormContratual v-if="computedEmployeeTypeId == 0" />
          <EmployeeFormNormative
            v-else
            @updateValidityRights="getValidityRights"
            @hide="hideAlert"
            ref="employeeFormNormative"
          />
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
                {{ $t("employeeConsultation.labels.editAddress") }}
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
                {{ $t("employeeConsultation.labels.newAddress") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-dialog v-model="dialog" persistent max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    :disabled="disabledAssignMedicalUnit"
                    class="sizeTextButton"
                    type="button"
                    color="success"
                    large
                    dense
                    v-bind="attrs"
                    v-on="on"
                    @click="onBtnAssignMedicalUnit"
                  >
                    {{ $t("employeeConsultation.labels.assignMedicalUnit") }}
                  </v-btn>
                </template>
                <v-card>
                  <ValidationObserver v-slot="{ handleSubmit }" ref="form">
                    <form @submit.prevent="handleSubmit(onSubmit)">
                      <v-card-title class="text-h5">
                        {{
                          $t("employeeConsultation.labels.assignMedicalUnit")
                        }}
                      </v-card-title>
                      <v-col cols="12" sm="12" md="12">
                        <ValidationProvider
                          :name="$t('employeeConsultation.attributes.validity')"
                          v-slot="{ errors }"
                          rules="required"
                        >
                          <v-autocomplete
                            class="required"
                            dense
                            name="medicalUnit"
                            outlined
                            item-text="Nombre"
                            item-value="Id"
                            :items="medicalUnitsList"
                            :label="
                              $t('employeeConsultation.labels.medicalUnit')
                            "
                            :disabled="isLoadingMedicalUnitsList"
                            :loading="isLoadingMedicalUnitsList"
                            v-model="medicalUnitId"
                            :error-messages="errors"
                          ></v-autocomplete>
                        </ValidationProvider>
                      </v-col>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="red darken-1"
                          text
                          @click="dialog = false"
                        >
                          {{ $t("employeeConsultation.labels.cancel") }}
                        </v-btn>
                        <v-btn type="submit" color="success" dark dense>
                          {{ $t("employeeConsultation.labels.assign") }}
                        </v-btn>
                      </v-card-actions>
                    </form>
                  </ValidationObserver>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                :disabled="disabledCredential"
                class="colorCredentialButton sizeTextButton"
                type="button"
                dense
                large
                @click="onBtnCredentialization"
              >
                {{ $t("employeeConsultation.labels.credential") }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-toolbar flat>
          <v-toolbar-title>
            {{ $t("employeeConsultation.list.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="3" offset-md="9">
              <v-btn
                :disabled="disabledAddBeneficiary"
                class="sizeTextButton"
                type="button"
                dense
                large
                color="success"
                @click="onBtnAddBeneficiary"
              >
                +
                {{ $t("employeeConsultation.labels.addBeneficiary") }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-progress-linear
                :active="isLoadingBeneficiaries"
                :indeterminate="isLoadingBeneficiaries"
              ></v-progress-linear>
              <v-data-table
                :headers="headers"
                :items="beneficiaries"
                :items-per-page="5"
                class="elevation-1"
              >
                <template v-slot:item="row">
                  <tr>
                    <td>
                      <v-btn
                        class="mx-2"
                        @click="onBtnEdit(row.item.IdDerechohabiente)"
                      >
                        <v-icon dark>mdi-pencil</v-icon>
                      </v-btn>
                    </td>
                    <td>
                      <v-dialog
                        v-model="dialogDelete"
                        persistent
                        max-width="600"
                        :retain-focus="false"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="mx-2"
                            v-bind="attrs"
                            v-on="on"
                            @click="idBeneficiary = row.item.IdDerechohabiente"
                          >
                            <v-icon dark>mdi-delete</v-icon>
                          </v-btn>
                        </template>
                        <v-card>
                          <v-card-title class="text-h5">
                            {{
                              $t(
                                "employeeConsultation.labels.dialogs.confirmDelete.message"
                              )
                            }}
                          </v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              color="red darken-1"
                              text
                              @click="dialogDelete = false"
                            >
                              {{ $t("employeeConsultation.labels.no") }}
                            </v-btn>
                            <v-btn
                              color="success"
                              dark
                              dense
                              @click="deleteBeneficiary()"
                            >
                              {{ $t("employeeConsultation.labels.yes") }}
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </td>
                    <td>{{ row.item.Nombre }}</td>
                    <td>{{ row.item.ApellidoPaterno }}</td>
                    <td>{{ row.item.ApellidoMaterno }}</td>
                    <td>{{ row.item.Curp }}</td>
                    <td>{{ row.item.Parentesco }}</td>
                    <td>
                      {{
                        row.item.Vigencia
                          | dateFormatted("YYYY-MM-DD", "DD/MM/YYYY")
                      }}
                    </td>
                    <td>
                      <v-checkbox
                        :input-value="row.item.IndIncapacidad"
                        value
                        disabled
                      ></v-checkbox>
                    </td>
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
import moment from "moment";
import BeneficiaryService from "@/services/BeneficiaryService/";
import EmployeeService from "@/services/EmployeeService";
import {
  IBeneficiary,
  ITitularBeneficiaryRequest,
  IValidityRightsResponse,
} from "@/services/BeneficiaryService/types";
import EmployeeFormContratual from "./components/EmployeeFormContractual.vue";
import EmployeeFormNormative from "./components/EmployeeFormNormative.vue";
import { IMedicalUnit } from "@/services/MedicalUnitService/types";
import MedicalUnitService from "@/services/MedicalUnitService";
import Alert from "@/components/Alert.vue";

@Component({
  components: { EmployeeFormContratual, EmployeeFormNormative, Alert },
})
export default class EmployeeConsultation extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  protected employeeService = new EmployeeService();
  protected medicalUnitService = new MedicalUnitService();
  public medicalUnitsList: Array<IMedicalUnit> = [];
  public beneficiaries: Array<IBeneficiary> = [];
  public disabledCredential = false;
  public disabledAssignMedicalUnit = false;
  public disabledAddBeneficiary = false;
  public dialog = false;
  public dialogDelete = false;
  public isLoadingMedicalUnitsList = false;
  public isLoadingBeneficiaries = false;
  public medicalUnitId: number | null = null;
  public idBeneficiary: number | null = null;
  public alert = {
    alert: false,
    message: "",
    type: false,
  };
  public validityRights: IValidityRightsResponse = {
    GrupoPersonal: null,
    AreaPersonal: null,
    CentroDepto: null,
    DepartamentoDescripcion: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
    EstadoVigencia: false,
    TipoEmpleadoDescripcion: null,
    Nombres: "",
    ApellidoPaterno: "",
    ApellidoMaterno: "",
    Curp: null,
    IdDerechohabiente: null,
    Sexo: "",
  };
  public titularBeneficiary: ITitularBeneficiaryRequest = {
    IdPersona: null,
    IdCentro: null,
    IdDepartamento: null,
    Vigencia: null,
    IdEmpleado: null,
    IdTipoEmpleado: null,
    IdDerechohabiente: null,
  };
  public headers: Array<any> = [
    { text: "", value: "edit", sortable: false },
    { text: "", value: "delete", sortable: false },
    {
      text: this.$t("employeeConsultation.attributes.names"),
      value: "nombres",
    },
    {
      text: this.$t("employeeConsultation.attributes.lastname"),
      value: "ap_paterno",
    },
    {
      text: this.$t("employeeConsultation.attributes.surname"),
      value: "ap_materno",
    },
    {
      text: this.$t("employeeConsultation.attributes.curp"),
      value: "curp",
    },
    {
      text: this.$t("employeeConsultation.attributes.relationship"),
      value: "parentesco",
    },
    {
      text: this.$t("employeeConsultation.attributes.validity"),
      value: "vigencia",
    },
    {
      text: this.$t("employeeConsultation.attributes.inability"),
      value: "incapacidad",
    },
  ];

  get isLoading(): boolean {
    // TODO Refactor this form is submitting
    return false;
  }

  get computedIdPerson(): number {
    return Number(this.$route.params.paramIdPerson);
  }

  get computedEmployeeId(): number {
    return Number(this.$route.params.paramEmployeeId);
  }

  get computedEmployeeTypeId(): number {
    return Number(this.$route.params.paramEmployeeTypeId);
  }

  onBtnEditAddress(): void {
    this.$router.push({
      name: "address:editAddress",
      params: {
        paramEmployeeId: this.computedEmployeeId.toString(),
        paramEmployeeTypeId: this.computedEmployeeTypeId.toString(),
        paramIdPerson: this.computedIdPerson.toString(),
      },
    });
  }

  onBtnNewAddress(): void {
    this.$router.push({
      name: "address:newAddress",
      params: {
        paramEmployeeId: this.computedEmployeeId.toString(),
        paramEmployeeTypeId: this.computedEmployeeTypeId.toString(),
        paramIdPerson: this.computedIdPerson.toString(),
      },
    });
  }

  onBtnAssignMedicalUnit(): void {
    this.getMedicalUnits();
  }

  onBtnAddBeneficiary(): void {
    this.$router.push({
      name: "beneficiary:newBeneficiary",
      params: {
        paramEmployeeId: this.computedEmployeeId.toString(),
        paramEmployeeTypeId: this.computedEmployeeTypeId.toString(),
        paramIdPerson: this.computedIdPerson.toString(),
      },
    });
  }

  onBtnCredentialization(): void {
    this.$router.push({
      name: "credentialization:credentialization",
      params: {
        paramEmployeeId: this.computedEmployeeId.toString(),
        paramEmployeeTypeId: this.computedEmployeeTypeId.toString(),
        paramIdPerson: this.computedIdPerson.toString(),
      },
    });
  }

  getAllBeneficiaries(): void {
    if (!this.validityRights.IdDerechohabiente) return;
    this.isLoadingBeneficiaries = true;
    this.beneficiaryService
      .getAll(this.validityRights.IdDerechohabiente)
      .then((response) => {
        this.beneficiaries = response.Data;
      })
      .finally(() => {
        this.isLoadingBeneficiaries = false;
      });
  }

  hideAlert(): void {
    this.alert.message = "";
    this.alert.alert = false;
    this.alert.type = false;
  }

  async getValidityRights() {
    let responseValidityRights = await this.beneficiaryService.getValidityRights(
      this.computedIdPerson,
      this.computedEmployeeId,
      this.computedEmployeeTypeId
    );
    console.log(responseValidityRights)
    if (responseValidityRights.Success) {
      this.validityRights = responseValidityRights.Data;
      if (this.validityRights.IdDerechohabiente == null) {
        this.disabledCredential = true;
        this.disabledAssignMedicalUnit = true;
        this.disabledAddBeneficiary = true;
      } else {
        this.disabledCredential = false;
        this.disabledAssignMedicalUnit = false;
        this.disabledAddBeneficiary = false;
      }
    }
  }

  onBtnEdit(idBeneficiary: number): void {
    this.$router.push({
      name: "beneficiary:editBeneficiary",
      params: {
        paramEmployeeId: this.computedEmployeeId.toString(),
        paramEmployeeTypeId: this.computedEmployeeTypeId.toString(),
        paramIdPerson: this.computedIdPerson.toString(),
        paramIdBeneficiary: idBeneficiary.toString(),
      },
    });
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

  getMedicalUnit(): void {
    if (!this.validityRights.IdDerechohabiente) return;
    this.beneficiaryService
      .getMedicalUnit(this.validityRights.IdDerechohabiente)
      .then((response) => {
        this.medicalUnitId = response.Data;
      });
  }

  onSubmit(): void {
    this.beneficiaryService
      .updateMedicalUnit(
        this.validityRights.IdDerechohabiente,
        this.medicalUnitId
      )
      .then((response) => {
        this.alert = {
          message: this.$t(
            "employeeConsultation.labels.dialogs.successAssign.message"
          ) as string,
          alert: true,
          type: true,
        };
      })
      .catch((error) => {
        this.alert = {
          message: this.$t(
            "employeeConsultation.labels.dialogs.errorAssign.message"
          ) as string,
          alert: true,
          type: false,
        };
      })
      .finally(() => {
        this.dialog = false;
      });
    (this.$refs.employeeFormNormative as EmployeeFormNormative).hideAlert();
  }

  deleteBeneficiary(): void {
    this.beneficiaryService
      .delete(this.idBeneficiary)
      .then((response) => {
        this.getAllBeneficiaries();
        this.alert = {
          message: this.$t(
            "employeeConsultation.labels.dialogs.successDelete.message"
          ) as string,
          alert: true,
          type: true,
        };
      })
      .catch((error) => {
        this.alert = {
          message: this.$t(
            "employeeConsultation.labels.dialogs.errorDelete.message"
          ) as string,
          alert: true,
          type: false,
        };
      })
      .finally(() => {
        this.dialogDelete = false;
      });
  }

  async mounted() {
    await this.getValidityRights();
    this.getAllBeneficiaries();
    this.getMedicalUnit();
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
  color: white;
}
</style>
