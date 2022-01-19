<template>
  <v-app id="app">
    <component :is="layout"></component>
    <SnackbarAlert
      :text="notify.text"
      v-if="notify.open"
      v-model="notify.open"
      :color="notify.color"
      @close="closeNotify"
    />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppLayout from "@/components/layouts/AppLayout.vue";
import PublicLayout from "@/components/layouts/PublicLayout.vue";
import SnackbarAlert from "@/components/snackbarAlert/SnackbarAlert.vue";

@Component({
  components: {
    PublicLayout,
    AppLayout,
    SnackbarAlert,
  },
})
export default class App extends Vue {
  name = "App";
  public messageAlert = "";
  public notifyModel = true;

  get layout(): string {
    return this.$store.state.app.layout;
  }

  get notify(){
    return this.$store.state.app.notifyModel;
  }

  closeNotify(){
    this.$store.dispatch("app/clearNotify");
  }
}
</script>

<style lang="scss">
@import "general";
</style>
