<template>
  <v-snackbar :value="value" :top="true">
    <p>{{ text || ''}}</p>
    <!-- <slot></slot> -->
    <template v-slot:action="{ attrs }">
      <v-btn :color="color" text v-bind="attrs" @click="closeSnackbar">
        {{ $t("dictionary.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, ModelSync } from "vue-property-decorator";

@Component({})
export default class SnackbarAlert extends Vue {
  @Prop({
    type: Boolean,
    default: false,
    required: true,
  })
  public value!: boolean ;

  @Prop({ type: String, default: "#E80459" })
  public color?: string;

  @Prop({
    type: String,
    default: "",
    required: false,
  })
  public text!:string;

  closeSnackbar(value: boolean): void {
    this.$emit("input", false);
  }
}
</script>

<style scoped></style>
