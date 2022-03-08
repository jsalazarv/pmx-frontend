<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title class="highlight">
            {{ $t("credentialization.report.title") }}
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-progress-linear
          :active="isLoading"
          :indeterminate="isLoading"
        ></v-progress-linear>
        <v-container fluid>
          <v-row class="mt-0">
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                :label="$t('credentialization.attributes.employeeType')"
                name="employeeType"
                dense
                outlined
                readonly
                :value="validityRights.TipoEmpleadoDescripcion"
                :loading="isLoadingValidityRights"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                :label="$t('credentialization.attributes.assignmentNumber')"
                name="assignmentNumber"
                dense
                outlined
                readonly
                :value="computedEmployeeId"
                :loading="isLoadingValidityRights"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field
                :label="$t('credentialization.attributes.fullname')"
                name="fullname"
                dense
                outlined
                readonly
                :value="computedFullname"
                :loading="isLoadingValidityRights"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row> </v-row>
          <v-row>
            <v-col class="pb-0" cols="12" sm="12" md="1" offset-md="7">
              <v-btn color="primary" dark @click="selectSignature()">
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="12" md="11">
              <v-card class="mx-auto" color="#B9B8B9" height="250" width="450">
                <v-list-item four-line class="mt-0">
                  <v-list-item-content class="pb-0">
                    <div class="text-overline mb-4 pb-0">
                      <v-img
                        max-width="100"
                        contain
                        src="@/assets/logoPemex.png"
                        transition="scale-transition"
                      />
                    </div>
                    <v-list-item-title class="text-h5 pb-0">
                      401739
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-row>
                  <v-col class="pb-0" cols="5">
                    <v-list-item four-line class="mt-0">
                      <v-list-item-content class="pb-0">
                        <v-list-item-subtitle
                          >FELIX ALBERTO</v-list-item-subtitle
                        >
                        <v-list-item-subtitle
                          >CABRERA GODINEZ</v-list-item-subtitle
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col class="pb-0" cols="3">
                    <v-img
                      v-if="previewSignature"
                      :src="previewSignature"
                      class="mt-16 mt-0"
                      max-width="100"
                      contain
                      transition="scale-transition"
                    />
                    <v-list-item-avatar tile size="100" color="grey" v-else>
                      <v-icon class="white--text" @click="selectSignature()"
                        >mdi-file-upload</v-icon
                      >
                      <input
                        class="d-none"
                        ref="signature"
                        type="file"
                        @change="loadSignature"
                        color="secondary"
                        accept="image/*"
                      />
                    </v-list-item-avatar>
                  </v-col>
                  <v-col class="pb-0" cols="4">
                    <v-img
                      v-if="previewPhoto"
                      :src="previewPhoto"
                      alt="Sunny image"
                      width="92"
                    ></v-img>
                    <v-list-item-avatar tile size="100" color="grey" v-else>
                      <v-icon class="white--text" @click="selectPhoto()"
                        >mdi-account-arrow-up</v-icon
                      >
                      <input
                        class="d-none"
                        ref="photo"
                        type="file"
                        @change="loadPhoto"
                        color="secondary"
                        accept="image/*"
                      />
                    </v-list-item-avatar>
                  </v-col>
                </v-row>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-subtitle
                      >Codigo de barras</v-list-item-subtitle
                    >
                    <v-list-item-subtitle
                      >CAGF940404HPLBDL01</v-list-item-subtitle
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <!-- <v-col class="pt-0" cols="12" sm="12" md="2" offset-md="7">
              <v-btn color="primary" dark @click="selectSignature()">
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-col> -->
            <!-- <v-col cols="12" sm="12" md="2">
              <v-card height="240" width="100" class="mx-auto"> </v-card>
            </v-col> -->
          </v-row>
        </v-container>
      </v-card>
<!-- <vue-barcode  value="Hello, World!" :options="{ displayValue: false }"></vue-barcode> -->
    </div>
  </div>
</template>

<script lang="ts">
import BeneficiaryService from "@/services/BeneficiaryService";
import { IValidityRightsResponse } from "@/services/BeneficiaryService/types";
import Vue from "vue";
import Component from "vue-class-component";
// import VueBarcode from '@chenfengyuan/vue-barcode';



@Component({
  //  components: { VueBarcokckde },
})
export default class Credentialization extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  public isLoadingValidityRights = false;
  public photo: any = null;
  public previewPhoto: any = null;
  public signature: any = null;
  public previewSignature: any = null;
  // public items = [
  //   { title: "Seleccionar fotografía", icon: "mdi-view-dashboard" },
  //   { title: "Capturar fotografía", icon: "mdi-view-dashboard" },
  //   { title: "Seleccionar firma", icon: "mdi-view-dashboard" },
  //   { title: "Imprimir credencial", icon: "mdi-view-dashboard" },
  //   { title: "Entregar credencial", icon: "mdi-view-dashboard" },
  //   // { title: "Photos", icon: "mdi-image" },
  //   // { title: "About", icon: "mdi-help-box" },
  // ];
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

  get computedFullname(): string {
    return `${this.validityRights.Nombres} ${this.validityRights.ApellidoPaterno} ${this.validityRights.ApellidoMaterno}`;
  }

  getValidityRights(): void {
    this.isLoadingValidityRights = true;
    this.beneficiaryService
      .getValidityRights(
        this.computedIdPerson,
        this.computedEmployeeId,
        this.computedEmployeeTypeId
      )
      .then((response) => {
        this.validityRights = response.Data;
      })
      .finally(() => {
        this.isLoadingValidityRights = false;
      });
  }

  getBase64(file: any) {
    return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      let imgResult: any = "";
      reader.readAsDataURL(file);
      reader.onload = function () {
        imgResult = reader.result;
      };
      reader.onerror = function (error) {
        reject(error);
      };
      reader.onloadend = function () {
        resolve(imgResult);
      };
    });
  }

  // loadPhoto(payload: any) {
  //   console.log(payload.target.files[0]);
  //   // this.getBase64

  //   //const file = payload.target.files[0]; // use it in case of normal HTML input
  //   // this.photo = payload; // in case vuetify file input
  //   // if (this.photo) {
  //   //   this.previewPhoto = URL.createObjectURL(this.photo);
  //   //   URL.revokeObjectURL(this.photo); // free memory
  //   // } else {
  //   //   this.previewPhoto = null;
  //   // }
  //   // let formData = new FormData();
  //   // formData.append("image", this.photo);
  //   // console.log(formData);
  // }

  // loadSignature(payload: any) {
  //   this.signature = payload;
  //   if (this.signature) {
  //     this.previewSignature = URL.createObjectURL(this.signature);
  //     URL.revokeObjectURL(this.signature);
  //   } else {
  //     this.previewSignature = null;
  //   }
  //   let formData = new FormData();
  //   formData.append("image", this.signature);
  //   console.log(formData);
  // }

  loadSignature(event: any) {
    var input = event.target;
    console.log(input);
    if (input.files) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewSignature = e.target.result;
        console.log(e.target.result);
      };
      // this.image=input.files[0];
      console.log(input.files[0]);
      reader.readAsDataURL(input.files[0]);
    }
  }

  loadPhoto(event: any) {
    var input = event.target;
    console.log(input);
    if (input.files) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewPhoto = e.target.result;
        console.log(e.target.result);
      };
      // this.image=input.files[0];
      console.log(input.files[0]);
      reader.readAsDataURL(input.files[0]);
    }
  }

  selectPhoto() {
    (this.$refs.photo as HTMLFormElement).click();
  }

  selectSignature() {
    (this.$refs.signature as HTMLFormElement).click();
  }

  mounted(): void {
    this.getValidityRights();
  }
}
</script>

<style scoped>
p.small {
  line-height: 0.6;
}
</style>
