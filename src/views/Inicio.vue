<template>
  <v-app>
    <NavBar />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';

@Component({
  components: {
    NavBar,
  },
})
export default class Inicio extends Vue {}
</script>
