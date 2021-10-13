<template>
  <v-app id="app">
    <component :is="layout"></component>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppLayout from "@/components/layouts/AppLayout.vue";
import PublicLayout from "@/components/layouts/PublicLayout.vue";

@Component({
  components: { PublicLayout, AppLayout },
})
export default class App extends Vue {
  name = "App";
  get layout(): string {
    return this.$store.state.app.layout;
  }
}
</script>
