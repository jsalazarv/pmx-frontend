<template>
  <div>
    <navbar />
    <sidebar />
    <v-main>
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Sidebar from "@/components/layouts/partials/Sidebar.vue";
import Navbar from "@/components/layouts/partials/Navbar.vue";

@Component({
  components: { Navbar, Sidebar },
})
export default class AppLayout extends Vue {}
</script>
