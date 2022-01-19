<template>
  <v-dialog v-model="dialog" persistent max-width="750">
    <v-card>
      <v-card-title class="text-h6">
        {{
          existsBeneficiary
            ? $t("beneficiary.labels.validations.discharged")
            : $t("beneficiary.labels.validations.isNotDischarged")
        }}</v-card-title
      >
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-card elevation="0" outlined>
              <v-card-title class="subheading font-weight-bold">
                {{ $t("beneficiary.attributes.title") }}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.names") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Renapo.Nombres }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.lastname") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Renapo.ApellidoPaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.surname") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Renapo.ApellidoMaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.birthday") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Renapo.FechaNacimiento }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.gender") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Renapo.Sexo }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" v-if="existsBeneficiary">
            <v-card elevation="0" outlined>
              <v-card-title class="subheading font-weight-bold">
                {{ $t("beneficiary.labels.mvd") }}
              </v-card-title>
              <v-divider></v-divider>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.names") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Person.Nombres }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.lastname") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Person.ApellidoPaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.surname") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Person.ApellidoMaterno }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.birthday") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Person.FechaNacimiento }}
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    {{ $t("beneficiary.attributes.gender") }}
                  </v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ computedPerson.Person.Sexo }}
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="hide" color="error darken-1" text>
          {{ $t("beneficiary.labels.cancel") }}
        </v-btn>
        <v-btn
          color="success"
          elevation="0"
          @click="select"
          :disabled="existsBeneficiary"
        >
          {{ $t("beneficiary.labels.select") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { IPersonValidationState } from "@/store/person/types";

@Component({})
export default class RenapoDialogBeneficiary extends Vue {
  @Prop({ default: false }) dialog!: boolean;
  @Prop({ default: false }) existsBeneficiary!: boolean;

  get computedPerson(): IPersonValidationState {
    return this.$store.state.person;
  }

  hide() {
    this.$emit("hideDialog");
  }

  select() {
    this.$emit("selectPerson");
  }
}
</script>

<style scoped></style>
