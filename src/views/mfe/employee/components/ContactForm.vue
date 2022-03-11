<template>
  <div>
    <v-container>
      <v-btn @click="addRow" small text color="primary" class="ml-2">
        <v-icon>mdi-card-account-phone</v-icon>
        <span class="ml-2">{{ $t("employee.labels.add") }}</span>
      </v-btn>
      <v-row
        class="rounded mb-2 mx-0"
        v-for="(contact, index) in contacts"
        :key="index"
        style="border: 1px solid lightgrey"
      >
        <v-col cols="12" md="3">
          <ValidationProvider
            :name="$t('employee.attributes.contactType')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-autocomplete
              dense
              name="contactType"
              :label="$t('employee.attributes.contactType')"
              outlined
              required
              :items="contactTypes"
              item-text="Nombre"
              item-value="IdTipoContacto"
              @change="getContactTypes"
              v-model="contact.IdTipoContacto"
              :error-messages="errors"
            ></v-autocomplete>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.contactDetail')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="contactDetail"
              :label="$t('employee.attributes.contactDetail')"
              outlined
              required
              v-model="contact.Detalle"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
        </v-col>
        <v-col cols="12" md="4">
          <ValidationProvider
            :name="$t('employee.attributes.extension')"
            rules="required"
            v-slot="{ errors }"
          >
            <v-text-field
              dense
              name="extension"
              :label="$t('employee.attributes.extension')"
              outlined
              required
              v-model="contact.Extension"
              :error-messages="errors"
            ></v-text-field>
          </ValidationProvider>
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
          <v-btn
            icon
            small
            color="primary"
            :disabled="index === contacts.length - 1"
            @click="moveDown(index)"
          >
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
          <v-btn
            icon
            small
            color="red"
            :disabled="contacts.length === 1"
            @click="deleteRow(index)"
          >
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
import { IContactRequest } from "@/store/employee/types";

@Component({})
export default class ContactForm extends Vue {
  protected contactTypeService = new ContactTypesService();
  public contactTypes: Array<IContactTypes> = [];
  public isLoadingContactTypes = false;
  /*public formData = {
    contacts: [{}],
  };*/

  get contacts(): Array<IContactRequest> {
    return this.$store.state.employees.contacts;
  }

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
    this.$store.dispatch("employees/addContact", {});
  }

  moveUp(index: number): void {
    let temp1 = this.contacts[index];
    let temp2 = this.contacts[index - 1];
    this.$set(this.contacts, index, temp2);
    this.$set(this.contacts, index - 1, temp1);
  }

  moveDown(index: number): void {
    let temp1 = this.contacts[index];
    let temp2 = this.contacts[index + 1];
    this.$set(this.contacts, index, temp2);
    this.$set(this.contacts, index + 1, temp1);
  }

  deleteRow(index: number): void {
    this.contacts.splice(index, 1);
  }

  mounted(): void {
    this.getContactTypes();
  }
}
</script>

<style scoped></style>
