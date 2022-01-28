<template>
  <v-dialog
    v-model="isDialogOpen"
    persistent
    max-width="750"
    scrollable
    class="mx-2"
  >
    <v-card>
      <v-card-title class="text-h6" v-if="title">
        {{ title }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" v-if="mfeData.Nombres">
            <v-card elevation="0" outlined>
              <v-card-title class="subheading font-weight-bold">
                {{ $t("employee.labels.dialogs.renapo.subtitles.mfe") }}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.names") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ mfeData.Nombres }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.lastname") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ mfeData.ApellidoPaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.surname") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ mfeData.ApellidoMaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.birthday") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ mfeData.FechaNacimiento }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.gender") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ mfeData.Sexo }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card elevation="0" outlined>
              <v-card-title class="subheading font-weight-bold">
                {{ $t("employee.labels.dialogs.renapo.subtitles.renapo") }}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.names") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ renapoData.Nombres }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.lastname") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ renapoData.ApellidoPaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.surname") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ renapoData.ApellidoMaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.birthday") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ renapoData.FechaNacimiento }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("employee.labels.dialogs.renapo.gender") }}:
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ renapoData.Sexo }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error darken-1" text @click="cancel">
          {{ $t("employee.labels.dialogs.renapo.labels.cancel") }}
        </v-btn>
        <v-btn
          color="success"
          elevation="0"
          @click="selectData"
          :disabled="!renapoData.Nombres"
        >
          {{ $t("employee.labels.dialogs.renapo.labels.select") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Emit, Prop, PropSync, Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { IEmployeeForm } from "@/store/employee/types";

@Component({})
export default class RenapoDialog extends Vue {
  @Prop()
  public title?: string;

  @Prop()
  public mfeData!: Partial<IEmployeeForm>;

  @Prop()
  public renapoData!: Partial<IEmployeeForm>;

  @PropSync("open")
  public isDialogOpen!: boolean;

  public onSelectData!: () => void;
  public onCancel!: () => void;

  @Emit("onCancel")
  cancel(): void {
    if (this.onCancel) {
      this.onCancel();
    }
    this.closeDialog();
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
  @Emit("onSelect")
  selectData(): void {
    this.selectDataRenapo();
    if (this.onSelectData) {
      this.onSelectData();
    }
    this.closeDialog();
  }

  selectDataRenapo(): void {
    this.$store.dispatch("employees/setEmployeeData", this.renapoData);
  }

  selectDataMFE(): void {
    this.$store.dispatch("employees/setEmployeeData", this.mfeData);
  }
}
</script>

<style scoped></style>
