<template>
  <div>
    <v-dialog width="500" :value="valueModel">
      <v-card>
        <v-card-title>
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize mr-2" @click="cancel"> Cancelar </v-btn>
          <v-btn class="text-capitalize" color="primary" @click="confirm">
            Aceptar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  props: {
    title: {
      type: String,
      default: () => "",
      required: false,
    },
    text: {
      type: String,
      default: () => "",
      required: false,
    },
  },
})
export default class ConfirmationDialog extends Vue {
  @Prop({
    type: Boolean,
    default: () => false,
    required: false,
  })
  public value = false;

  get valueModel() {
    return this.value;
  }

  set valueModel(value) {
    this.emitValueChange(value);
  }

  cancel(): void {
    this.emitValueChange();
  }

  emitValueChange(value: boolean = false) {
    this.$emit("input", value);
  }

  confirm() {
    this.$emit("confirm", true);
    this.emitValueChange();
  }
}
</script>

<style></style>
