<template>
  <div v-layout="'app-layout'">
    <div class="pa-4">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>{{
            $t("assignmentFolios.list.title")
          }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <div>
            <v-text-field
              dense
              append-icon="fa fa-search"
              :label="$t('assignmentFolios.labels.search')"
              single-line
              hide-details
              outlined
            ></v-text-field>
          </div>
          <v-divider class="mx-1" inset vertical></v-divider>
          <v-btn color="primary">
            {{ $t("assignmentFolios.labels.search") }}
          </v-btn>
        </v-toolbar>
        <v-data-table hide-default-footer :headers="headers"> </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class AssignmentFolios extends Vue {
  public headers = [
    {
      text: this.$t("assignmentFolios.attributes.folio"),
      value: "folio",
      sortable: false,
    },
    {
      text: this.$t("assignmentFolios.attributes.assignmentNumber"),
      value: "assignmentNumber",
      sortable: false,
    },
    {
      text: this.$t("assignmentFolios.attributes.reason"),
      value: "reason",
      sortable: false,
    },
    {
      text: this.$t("assignmentFolios.attributes.status"),
      value: "status",
      sortable: false,
    },
  ];
}
</script>

<style scoped></style>
