<template>
  <div class="text-center">
    <v-snackbar :value="value" :top="true">
      <span :style="{ color: colorText }">
        {{ text }}
      </span>
      <template v-slot:action="{ attrs }">
        <div class="text-center">

          <v-btn class="white--text" text v-bind="attrs" @click="closeSnackbar" :color="colorBtn">
            {{ $t("dictionary.close") }}
          </v-btn>
        </div>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, ModelSync } from "vue-property-decorator";

@Component({})
export default class SnackbarAlert extends Vue {
  @Prop({
    type: Boolean,
    default: false,
    required: false,
  })
  public value!: boolean;

  @Prop({ type: String, default: "#E80459" })
  public colorText?: string;

  @Prop({ type: String, default: "#E80459" })
  public colorBtn?: string;

  @Prop({
    type: String,
    default: "",
    required: false,
  })
  public text!: string;

  closeSnackbar(value: boolean): void {
    this.$emit("input", false);
    this.$emit("close");
  }
}
</script>

<style>

</style>
