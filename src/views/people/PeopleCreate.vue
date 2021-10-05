<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>
            Alta
          </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
        </v-toolbar>
        <people-form-renapo />
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PeopleFormRenapo from "@/views/people/components/PeopleFormRenapo.vue";
@Component({
  components: {PeopleFormRenapo}
})
export default class PeopleCreate extends Vue {

}
</script>