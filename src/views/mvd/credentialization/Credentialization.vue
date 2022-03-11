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
            <v-col cols="12" sm="12" md="2" offset-md="6">
              <v-btn-toggle>
                <v-btn @click="selectSignature()">
                  <v-icon>mdi-file-upload</v-icon>
                </v-btn>
                <input
                  class="d-none"
                  ref="signature"
                  type="file"
                  @change="loadSignature"
                  color="secondary"
                  accept="image/*"
                />
                <v-btn @click="selectPhoto()">
                  <v-icon>mdi-account-arrow-up</v-icon>
                </v-btn>
                <input
                  class="d-none"
                  ref="photo"
                  type="file"
                  @change="loadPhoto"
                  color="secondary"
                  accept="image/*"
                />

                <v-dialog v-model="dialog" persistent>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click="onStart">
                      <v-icon>mdi-camera</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-col cols="12" sm="12" md="6" offset-md="3">
                      <web-cam
                        ref="webcam"
                        :device-id="deviceId"
                        width="90%"
                        heigth="300%"
                        @started="onStarted"
                        @stopped="onStopped"
                        @error="onError"
                        @cameras="onCameras"
                        @camera-change="onCameraChange"
                        :class="!showCamera ? 'd-none' : ''"
                      />
                      <v-img
                        :class="showCamera ? 'd-none' : ''"
                        width="90%"
                        heigth="300%"
                        :src="photoCamera"
                      ></v-img>
                    </v-col>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" text @click="onStop">
                        Cancelar
                      </v-btn>
                      <v-btn color="primary" @click="onCapture">
                        Capturar foto
                      </v-btn>
                      <v-btn color="primary" @click="onStopAndStart">
                        Usar cámara
                      </v-btn>
                      <v-btn
                        color="success"
                        @click="onUsePhoto"
                        :disabled="!photoCamera ? true : false"
                      >
                        Usar foto
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-btn-toggle>
            </v-col>
            <v-col class="pt-0 pb-0" cols="12" sm="12" md="11">
              <v-card class="mx-auto" color="#B9B8B9" height="287" width="470">
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
                        <v-list-item-subtitle>
                          <v-skeleton-loader
                            max-width="120"
                            max-height="20"
                            :loading="true"
                            type="card"
                          ></v-skeleton-loader>
                        </v-list-item-subtitle>
                        <v-list-item-subtitle
                          ><v-skeleton-loader
                            max-width="120"
                            max-height="20"
                            :loading="true"
                            type="card"
                          ></v-skeleton-loader
                        ></v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>
                  <v-col class="pb-0" cols="3">
                    <v-img
                      :aspect-ratio="1 / 1"
                      v-if="previewSignature"
                      :src="previewSignature"
                      class="mt-16 mt-0"
                      max-height="70"
                      max-width="120"
                      contain
                      transition="scale-transition"
                    />
                    <v-list-item-avatar tile size="100" color="grey" v-else>
                      <span class="text-caption">Firma no disponible</span>
                    </v-list-item-avatar>
                  </v-col>
                  <v-col class="pb-0" cols="4">
                    <v-img
                      :aspect-ratio="1 / 1"
                      v-if="previewPhoto"
                      :src="previewPhoto"
                      max-height="320"
                      max-width="120"
                    ></v-img>
                    <v-list-item-avatar tile size="100" color="grey" v-else>
                      <span class="text-caption">Foto no disponible</span>
                    </v-list-item-avatar>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="pb-0" cols="3">
                    <barcode
                      width="1"
                      height="25"
                      fontSize="12"
                      background="#B9B8B9"
                      value="CAGF940404HPLBDL01"
                    >
                      Show this if the rendering fails.
                    </barcode>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12" md="2" offset-md="4">
              <v-btn type="submit" color="success" dark dense x-small>
                Imprimir credencial
                <!-- <v-icon right dark>mdi-content-save</v-icon> -->
              </v-btn>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12" md="2">
              <v-btn type="submit" color="success" dark dense x-small>
                Entregar credencial
                <!-- <v-icon right dark>mdi-content-save</v-icon> -->
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0" cols="12" sm="12" md="3">
              <v-text-field
                label="Último usuario que trabajó"
                name="employeeType"
                dense
                outlined
                readonly
                value=""
              >
              </v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12" md="3">
              <v-text-field
                label="Extensión usuario"
                name="employeeType"
                dense
                outlined
                readonly
                value=""
              >
              </v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12" md="3">
              <v-text-field
                label="Fecha captura/guardado imagen"
                name="employeeType"
                dense
                outlined
                readonly
                value=""
              >
              </v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12" md="3">
              <v-text-field
                label="Fecha de producción"
                name="employeeType"
                dense
                outlined
                readonly
                value=""
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="mt-0">
            <v-col class="pb-0" cols="12" sm="12" md="3">
              <v-text-field
                label="Folio"
                name="employeeType"
                dense
                outlined
                readonly
                value=""
              >
              </v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" sm="12" md="3">
              <v-text-field
                label="Número de orden"
                name="employeeType"
                dense
                outlined
                readonly
                value=""
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import BeneficiaryService from "@/services/BeneficiaryService";
import { IValidityRightsResponse } from "@/services/BeneficiaryService/types";
import Vue from "vue";
import Component from "vue-class-component";
import VueBarcode from "vue-barcode";
import { WebCam } from "vue-web-cam";
import { Watch } from "vue-property-decorator";
import { find, head } from "lodash";

@Component({
  components: { barcode: VueBarcode, WebCam },
})
export default class Credentialization extends Vue {
  protected beneficiaryService = new BeneficiaryService();
  public isLoadingValidityRights = false;
  public photo: any = null;
  public previewPhoto: any = null;
  public signature: any = null;
  public previewSignature: any = null;
  public imageBase64 = null;
  public dialog = false;
  public photoCamera = null;
  public camera = null;
  public deviceId = null;
  public devices = [];
  public showCamera = true;
  public firstTime = false;
  public theme = {
    default: { isDark: true },
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

  get device(): undefined {
    //  let x = find(this.devices, x => x.deviceId == this.deviceId);
    return this.devices.find((devices: any) => devices.id === this.deviceId);
  }

  @Watch("devices")
  onPropertyChanged(value: string, oldValue: string) {
    let first = head(this.devices);
    if (first) {
      this.camera = first.deviceId;
      this.deviceId = first.deviceId;
    }
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

  loadSignature(event: any) {
    var input = event.target;
    console.log(input);
    if (input.files) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewSignature = e.target.result;
      };
      // this.image=input.files[0];
      reader.readAsDataURL(input.files[0]);
    }
  }

  loadPhoto(event: any) {
    console.log(event);
    var input = event.target;
    console.log(input);
    if (input.files) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewPhoto = e.target.result;
      };
      // this.image=input.files[0];
      reader.readAsDataURL(input.files[0]);
    }
    event.target.value = ""; // clear input file
  }

  selectPhoto() {
    // (this.$refs.photo as HTMLFormElement).reset();
    (this.$refs.photo as HTMLFormElement).click();
  }

  selectSignature() {
    (this.$refs.signature as HTMLFormElement).click();
  }

  onCapture() {
    this.showCamera = false;
    this.photoCamera = (this.$refs.webcam as HTMLFormElement).capture();
    (this.$refs.webcam as HTMLFormElement).stop();
  }

  onStarted(stream: any) {
    console.log("On Started Event", stream);
  }

  onStopped(stream: any) {
    console.log("On Stopped Event", stream);
  }

  onStop() {
    this.showCamera = true;
    this.photoCamera = null;
    this.dialog = false;
    (this.$refs.webcam as HTMLFormElement).stop();
  }

  onStart() {
    this.showCamera = true;
    if (this.firstTime) {
      (this.$refs.webcam as HTMLFormElement).start();
    } else {
      this.firstTime = true;
    }
  }

  onStopAndStart() {
    this.showCamera = true;
    this.photoCamera = null;
    (this.$refs.webcam as HTMLFormElement).stop();
    (this.$refs.webcam as HTMLFormElement).start();
  }

  onError(error: any) {
    console.log("On Error Event", error);
  }

  onCameras(cameras: any) {
    this.devices = cameras;
    console.log("On Cameras Event", cameras);
  }

  onCameraChange(deviceId: any) {
    this.deviceId = deviceId;
    this.camera = deviceId;
    console.log("On Camera Change Event", deviceId);
  }

  onUsePhoto() {
    (this.$refs.webcam as HTMLFormElement).stop();
    this.previewPhoto = this.photoCamera;
    this.dialog = false;
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
