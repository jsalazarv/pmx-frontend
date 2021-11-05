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
        <v-progress-linear
          :active="isLoadingFoliosLogbookList"
          :indeterminate="isLoadingFoliosLogbookList"
        ></v-progress-linear>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="foliosLogbookList"
        >
        </v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import FoliosLogbook from "@/services/FoliosLogbook";
import { IFoliosLogbook } from "@/services/FoliosLogbook/types";

@Component({})
export default class AssignmentFolios extends Vue {
  protected foliosLogbookService = new FoliosLogbook();
  public foliosLogbookList: Array<IFoliosLogbook> = [];
  public isLoadingFoliosLogbookList = false;

  public headers = [
    {
      text: this.$t("assignmentFolios.attributes.folio"),
      value: "IdFolioAsignacion",
      sortable: false,
    },
    {
      text: this.$t("assignmentFolios.attributes.assignmentNumber"),
      value: "IdEmpleado",
      sortable: false,
    },
    {
      text: this.$t("assignmentFolios.attributes.reason"),
      value: "Motivo",
      sortable: false,
    },
    {
      text: this.$t("assignmentFolios.attributes.status"),
      value: "Estatus",
      sortable: false,
    },
  ];

  getFoliosLogBook(): void {
    this.isLoadingFoliosLogbookList = true;
    this.foliosLogbookService
      .getAll()
      .then((response) => {
        this.foliosLogbookList = response.Data;
      })
      .finally(() => {
        this.isLoadingFoliosLogbookList = false;
      });
  }

  mounted(): void {
    this.getFoliosLogBook();
  }
}
</script>

<style scoped></style>
