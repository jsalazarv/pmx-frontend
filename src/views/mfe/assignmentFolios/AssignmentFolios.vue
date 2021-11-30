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
              :label="$t('assignmentFolios.labels.search')"
              :disabled="isLoadingFoliosLogbookList"
              clearable
              @click:clear="getFoliosLogBook"
              single-line
              hide-details
              outlined
              v-model="params.IdFolioAsignacion"
            ></v-text-field>
          </div>
          <v-divider class="mx-1" inset vertical></v-divider>
          <v-btn
            color="success"
            :disabled="isLoadingFoliosLogbookList || !params.IdFolioAsignacion"
            @click="search"
          >
            {{ $t("assignmentFolios.labels.search") }}
          </v-btn>
        </v-toolbar>
        <v-progress-linear
          :active="isLoadingFoliosLogbookList"
          :indeterminate="isLoadingFoliosLogbookList"
        ></v-progress-linear>
        <v-data-table
          :headers="headers"
          :items="foliosLogbookList"
          :items-per-page="5"
          class="elevation-1"
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
import {
  IFoliosLogbook,
  IFoliosLogbookQueryFilter,
} from "@/services/FoliosLogbook/types";

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
      value: "EstatusDescripcion",
      sortable: false,
    },
  ];
  public params = {
    IdFolioAsignacion: "",
  };

  filters(): IFoliosLogbookQueryFilter {
    return {
      ...this.params,
    };
  }

  search(): void {
    this.getFoliosLogBook(this.filters());
  }

  getFoliosLogBook(filters = {}): void {
    this.isLoadingFoliosLogbookList = true;
    this.foliosLogbookService
      .search(filters)
      .then((response) => {
        this.foliosLogbookList = response.Data;
      })
      .finally(() => {
        this.isLoadingFoliosLogbookList = false;
      });
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
