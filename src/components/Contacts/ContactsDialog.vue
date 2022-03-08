<template>
  <div>
    <v-dialog v-model="openModel" width="1200">
      <v-card>
        <v-card-title class="headline">Contactos</v-card-title>
        <v-card-text>
          <v-row dense class="mt-2">
            <v-col cols="12">
              <v-btn
                @click="addRow"
                small
                text
                color="primary"
                class="ml-2 mb-2"
              >
                <v-icon>mdi-card-account-phone</v-icon>
                <span class="ml-2">{{ $t("employee.labels.add") }}</span>
              </v-btn>

              <v-row
                class="rounded"
                v-for="(item, index) of contacts"
                :key="index"
                style="border: 1px solid lightgrey"
                dense
              >
                <v-col cols="12" md="3" class="py-0">
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
                      v-model="item.IdTipoContacto"
                      :error-messages="errors"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
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
                      v-model="item.Detalle"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="4" class="py-0">
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
                      v-model="item.Extension"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col
                  cols="12"
                  md="1"
                  class="d-flex justify-center align-center mx-0 pa-0"
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
                    :disabled="index === getItemsContacts.length - 1"
                    @click="moveDown(index)"
                  >
                    <v-icon>mdi-menu-down</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    small
                    color="red"
                    :disabled="getItemsContacts.length === 1"
                    @click="deleteRow(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="text-right px-5">
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            class="text-capitalize mr-2"
            @click="saveContacts"
            v-if="contacts.length"
            >Guardar</v-btn
          >
          <v-btn class="text-capitalize" @click="closeContactsDialog"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import ContactTypesService from "@/services/ContactTypesService";
import { IContactTypes } from "@/services/ContactTypesService/types";

import { IContact, IContactRequest } from "@/services/ContactService/types";
import ContactService from "@/services/ContactService";

@Component({
  props: {
    value: {
      required: false,
      default: false,
      type: Boolean,
    },
    idPerson: {
      type: Number,
      default: () => null,
      required: false,
    },
    idUser: {
      type: Number,
      default: () => null,
      required: false,
    },
  },
})
export default class ContactsDialog extends Vue {
  protected contactTypeService = new ContactTypesService();
  protected contactService = new ContactService();
  public contactSelected: any = null;
  public contactTypes: Array<IContactTypes> = [];
  public isLoadingContactTypes = false;
  public rules: any = {
    required: (val: any) => !!val || "Campo requerido",
  };
  public contacts: Array<IContact> = [];
  public isCreated: boolean = false;

  mounted(): void {
    this.getContactTypes();
    this.getContacts();
  }

  get header() {
    return [
      {
        text: "Tipo de Contacto",
        value: "Tipo",
      },
      {
        text: "Detalle",
        value: "Detalle",
      },
      {
        Text: "Extensión",
        value: "Extension",
      },
    ];
  }

  get openModel(): boolean {
    return (this as any).value;
  }

  set openModel(value) {
    this.closeContactsDialog();
  }

  closeContactsDialog(): void {
    this.$emit("input", false);
  }

  get getItemsContacts(): Array<IContact> {
    return this.contacts;
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

  getContacts() {
    let vm = this as any;
    if (vm.idUser) {
      vm.contactService.getContactsByIdUser(vm.idUser).then((response: any) => {
        this.contacts = [];
        let data: Array<IContact> = response.Data;
        vm.contacts = data;
      });
    } else if (vm.idPerson) {
      vm.contactService
        .getContactsByIdPerson(vm.idPerson)
        .then((response: any) => {
          this.contacts = [];
          let data: Array<IContact> = response.Data;
          vm.contacts = data;
        });
    }
  }

  addRow(): void {
    let contact: IContact = {
      IdContacto: null,
      IdPersona: 0,
      IdTipoContacto: 0,
      Tipo: "",
      Extension: "",
      Detalle: "",
      Referencia: "",
      Baja: false,
    };

    this.contacts.push(contact);
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

  saveContacts(): void {
    let vm = this as any;

    if (vm.contacts.length) {
      let contacts: Array<IContactRequest> = vm.contacts.map(
        (item: IContact) => {
          return {
            IdContacto: item.IdContacto,
            IdPersona: item.IdPersona,
            IdTipoContacto: item.IdTipoContacto,
            Detalle: item.Detalle,
            Extension: item.Extension,
            Referencia: item.Referencia,
          } as IContactRequest;
        }
      );

      if (vm.idUser) {
        vm.contactService
          .generateContactsByIdUser(vm.idUser, contacts)
          .then((response: any) => {
            if (response.Success) {
              console.log(response);
            }
          });
      } else {
        vm.contactService
          .generateContactsByIdPerson(vm.idPerson, contacts)
          .then((response: any) => {
            if (response.Success) {
              console.log(response);
            }
          });
      }
    }
  }
}
</script>

<style></style>
