<template>
  <div>
    <v-menu
      v-model="isMenuOpenModel"
      :close-on-click="false"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="dateFormat"
          v-bind="{
            ...attrs,
            ...$attrs,
          }"
          v-on="on"
          outlined
          dense
          readonly
          :label="label"
          :hide-details="isHideDetails"
          :clearable="cleareable"
          @click:clear="$emit('clear')"
        ></v-text-field>
      </template>

      <v-date-picker
        :max="maxDate"
        :min="minDate"
        :value="getValue"
        @input="input"
      ></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  props: {
    label: {
      type: String,
      required: true,
      default() {
        return "";
      },
    },
    cleareable: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
    value: {
      type: String,
      default: () => "",
      required: false,
    },
    minDate: {
      type: String,
      required: false,
      default: () => "",
    },
    maxDate: {
      type: String,
      required: false,
      default: () => "",
    },
    isHideDetails: {
      type: Boolean,
      required: false,
      default: () => false,
    },
  },
})
export default class DatePicker extends Vue {
  public openMenu = false;
  public isMenuOpenModel = false;

  input(value: string) {
    this.$emit("input", value || "");
  }

  get getValue(): string {
    let vm = this as any;
    let value: string = vm.value?.trim() || null;

    return value ? vm.$moment(value).format("YYYY-MM-DD") : "";
  }

  set getValue(value: string) {
    this.input(value);
  }

  get dateFormat(): string {
    let vm = this as any;
    let value: string = vm.value?.trim() || null;

    return value ? vm.$moment(vm.value).format("DD-MM-YYYY") : "";
  }

}
</script>

<style></style>
