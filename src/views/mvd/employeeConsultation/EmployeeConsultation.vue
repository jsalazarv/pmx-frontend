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
                :value="consultationEmployee.consultation.rc"
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
                :value="consultationEmployee.consultation.department"
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
                :value="consultationEmployee.consultation.ValidityStatus"
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
                type="button"
                color="success"
                dark
                large
                dense
                @click.stop="dialog = true"
              >
                {{
                  $t(
                    "employeeConsultation.consultation.actionsButtons.assignAddress"
                  )
                }}
              </v-btn>

              <v-dialog v-model="dialog" max-width="800px">
                <v-card>
                  <v-card-title class="text-h5">
                    {{
                      $t(
                        "employeeConsultation.consultation.actionsButtons.assignAddress"
                      )
                    }}
                  </v-card-title>

                  <v-card-text>
                    <v-data-table
                      :headers="heeadersAddress"
                      :items="addressesPerson"
                      :items-per-page="5"
                      class="elevation-1"
                    >
                      <template v-slot:item="row">
                        <tr>
                          <td>
                            {{ addressString(row.item.domicilio_desc) }}
                          </td>

                          <td>
                            <v-chip
                              class="ma-2"
                              :color="row.item.baja ? 'success' : 'error'"
                              label
                              text-color="white"
                            >
                              <v-icon left>
                                {{
                                  row.item.baja ? "mdi-bank" : "mdi-bank-off"
                                }}</v-icon
                              >
                            </v-chip>
                          </td>
                          <td>
                            <v-btn
                              @click="
                                onBtnAssign(
                                  row.item.id_domicilio,
                                  row.item.id_domicilio_persona
                                )
                              "
                              class="mx-2"
                            >
                              {{
                                $t(
                                  "employeeConsultation.consultation.actionsButtons.assign"
                                )
                              }}
                            </v-btn>
                          </td>
                        </tr>
                      </template>
                    </v-data-table>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false">
                      {{
                        $t(
                          "employeeConsultation.consultation.actionsButtons.close"
                        )
                      }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
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
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-btn
                class="colorCredentialButton sizeTextButton"
                type="button"
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
import AddressService from "@/services/AddressService";
import {
  IAddressPerson,
  IAddressPersonSave,
} from "@/services/AddressService/types";
import address from "@/lang/en/address";

@Component({})
export default class EmployeeConsultation extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  protected employeeService = new EmployeeService();
  protected addressService = new AddressService();
  public dialog = false;
  public addressesPerson: Array<IAddressPerson> = [];
  public addressPersonSave: IAddressPersonSave = {
    id_domicilio_persona: null,
    id_domicilio: null,
    id_persona: null,
    usuario_sesion: null,
    baja: null,
  };
  public heeadersAddress: Array<any> = [
    {
      text: this.$t("employeeConsultation.consultation.addressTable.address"),
      value: "address",
    },
    {
      text: this.$t("employeeConsultation.consultation.addressTable.status"),
      value: "status",
    },
    {
      text: "",
      value: "",
      sortable: false,
    },
  ];
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
  public arrayAddress: Array<any> = [];

  get consultationEmployee(): IConsultationState {
    return this.$store.state.consultation;
  }

  onBtnAddBeneficiary(): void {
    this.$router.push({ path: "/derechohabiente/alta" });
  }

  onBtnAddAddress(): void {
    this.$router.push({ path: "/domicilio/alta" });
  }

  addressString(_address: string): string {
    let array = _address.split("|");
    console.log(array);
    return `${array[0]} ${array[1]}, ${array[3]}, ${array[6]}, ${array[4]}, ${array[5]}, ${array[7]} `;
  }

  getAddressesbyPerson(): void {
    this.addressService
      .getAddressesbyPerson(this.consultationEmployee.consultation.id_person)
      .then((response) => {
        this.addressesPerson = response.Data;
      });
  }

  getAllBeneficiaries(): void {
    // this.employeeTypesService .getAll() .then((response) => { this.employeeTypeList
    // = response.Data; }) .finally(() => { this.isLoadingEmployeeList = false; });
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

  onBtnAssign(idAddress: number, idAddressPerson: number): void {
    this.addressPersonSave.id_domicilio_persona = idAddressPerson;
    this.addressPersonSave.id_persona =
      this.consultationEmployee.consultation.id_person;
    this.addressPersonSave.usuario_sesion = 0; // TODO: Aquí va el usuario de la sesión
    this.addressPersonSave.baja = true;
    this.addressService
      .assignAddressPerson(this.addressPersonSave)
      .then((response) => {
        let index = this.addressesPerson.findIndex(
          (d) => d.id_domicilio == idAddress
        );
        this.addressesPerson[index].baja = true;
        for (let i = 0; i < this.addressesPerson.length; i++) {
          if (i != index) {
            this.addressesPerson[i].baja = false;
          }
        }
      });
  }

  mounted(): void {
    this.getAllBeneficiaries();
    this.getAddressesbyPerson();
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
