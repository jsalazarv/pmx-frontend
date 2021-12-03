<template>
  <v-row>
    <v-col cols="12" sm="12" md="12">
      <v-alert
        :value="alert"
        :type="type ? 'success' : 'error'"
        dismissible
        @input="hideAlert"
      >
        {{ message }}
      </v-alert>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class Alert extends Vue {
  @Prop({ default: "" }) message!: string;
  @Prop({ default: false }) alert!: boolean;
  @Prop({ default: false }) type!: boolean;

  hideAlert() {
    this.$emit("hideAlert");
  }
}
</script>
