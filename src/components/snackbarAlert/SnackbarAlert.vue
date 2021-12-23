<template>
  <v-snackbar v-model="isVisible" :top="true">
    <slot></slot>
    <template v-slot:action="{ attrs }">
      <v-btn :color="color" text v-bind="attrs" @click="closeSnackbar">
        {{ $t("dictionary.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, PropSync } from "vue-property-decorator";

@Component({})
export default class SnackbarAlert extends Vue {
  @PropSync("open")
  public isVisible!: boolean;

  @Prop({ type: String, default: "#E80459" })
  public color?: string;

  closeSnackbar(): void {
    this.isVisible = false;
  }
}
</script>

<style scoped></style>
