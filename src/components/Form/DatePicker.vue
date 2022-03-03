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

      <v-date-picker :value="getValue" @input="input"></v-date-picker>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

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
  },
})
export default class DatePicker extends Vue {
  public openMenu = false;
  public isMenuOpenModel = false;

  @Prop({
    type: String,
    default: () => "",
    required: false,
  })
  public value = "";

  @Prop({
    type: Boolean,
    required: false,
    default: () => false,
  })
  public isHideDetails = false;

  input(value: any) {
    this.$emit("input", value);
  }

  get getValue(): string {
    return this.value;
  }

  set getValue(value) {
    this.input(value);
  }

  get dateFormat(): string {
    return this.value;
  }

  set dateFormat(value: string) {
    this.$emit("input", "");
  }
}
</script>

<style></style>
