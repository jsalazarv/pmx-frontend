<template>
  <div>
    <v-container>
      <v-btn @click="addRow" small text right color="primary" class="ml-2">
        <v-icon>mdi-briefcase-plus</v-icon>
        <span>{{ $t("employee.labels.add") }}</span>
      </v-btn>
      <v-row
        class="rounded mb-2 mx-0"
        v-for="(contact, index) in formData.contacts"
        :key="index"
        style="border: 1px solid lightgrey"
      >
        <v-col cols="12" md="3">
          <v-autocomplete
            dense
            name="contactType"
            :label="$t('employee.attributes.contactType')"
            outlined
            required
            :items="contactTypes"
            item-text="Nombre"
            item-value="Nombre"
            @change="getContactTypes"
            v-model="contact.position"
          ></v-autocomplete>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            dense
            name="contactDetail"
            :label="$t('employee.attributes.contactDetail')"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            dense
            name="extension"
            :label="$t('employee.attributes.extension')"
            outlined
            required
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="1"
          class="d-flex justify-center align-center mx-0 px-0"
        >
          <v-btn
            icon
            small
            color="primary"
            :disabled="index === 0"
            @click="moveUp(index)"
          >
            <v-icon>mdi-menu-up</v-icon>
          </v-btn>
          <v-btn icon small color="primary">
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
          <v-btn icon small color="red">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ContactTypesService from "@/services/ContactTypesService";
import { IContactTypes } from "@/services/ContactTypesService/types";

@Component({})
export default class ContactForm extends Vue {
  protected contactTypeService = new ContactTypesService();
  public contactTypes: Array<IContactTypes> = [];
  public isLoadingContactTypes = false;
  public formData = {
    contacts: [{}],
  };

  getContactTypes(): void {
    this.isLoadingContactTypes = true;
    this.contactTypeService
      .getAll()
      .then((response) => {
        this.contactTypes = response.Data;
      })
      .catch()
      .finally(() => {
        this.isLoadingContactTypes = false;
      });
  }

  addRow(): void {
    this.formData.contacts.push({});
  }

  moveUp(index: number): void {
    let temp1 = this.formData.contacts[index];
    let temp2 = this.formData.contacts[index - 1];
    this.$set(this.formData.contacts, index, temp2);
    this.$set(this.formData.contacts, index - 1, temp1);
  }

  mounted(): void {
    this.getContactTypes();
  }
}
</script>

<style scoped></style>
