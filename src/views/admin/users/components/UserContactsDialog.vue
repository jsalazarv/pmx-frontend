<template>
  <div>
    <v-dialog v-model="openModel" width="800">
      <v-card>
        <v-card-title class="headline">Contactos</v-card-title>
        <v-card-text>
          <v-form v-if="contactSelected" ref="form">
            <v-row dense class="mt-2">
              <v-col cols="4" class="py-0">
                <v-text-field
                  :rules="[rules.required]"
                  dense
                  outlined
                  label="Detalle"
                  v-model="contactSelected.Detalle"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="py-0">
                <v-text-field
                  dense
                  outlined
                  label="Extensión"
                  v-model="contactSelected.Extension"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-btn color="primary" class="mr-2" @click="saveContact"
                  >Guardar
                </v-btn>
                <v-btn small @click="clearContactSelected"> Cancelar</v-btn>
              </v-col>
            </v-row>
          </v-form>
          <v-data-table :headers="headers" :items="items">
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn class="mr-2" @click="editContact(item)">Eliminar</v-btn>
              <v-btn @click="editContact(item)">Editar</v-btn>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions class="text-right">
          <v-spacer></v-spacer>
          <v-btn class="text-capitalize" @click="closeContactsDialog"
            >Cerrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class UserContacts extends Vue {
  @Prop({
    required: false,
    default: false,
    type: Boolean,
  })
  value = false;

  public rules: any = {
    required: (val: any) => !!val || "Campo requerido",
  };

  public contactSelected: any = null;

  get openModel(): boolean {
    return this.value;
  }

  set openModel(value) {
    this.closeContactsDialog();
  }

  closeContactsDialog(): void {
    this.$emit("input", false);
  }

  get headers() {
    return [
      {
        value: "Id",
        text: "Id",
      },
      {
        value: "Tipo",
        text: "Tipo de Contacto",
      },
      {
        value: "Detalle",
        text: "Detalle",
      },
      {
        value: "Extension",
        text: "Extensión",
      },
      {
        value: "actions",
        text: "",
        sortable: false,
      },
    ];
  }

  get items() {
    return [
      {
        Id: 1,
        Tipo: "Teléfono",
        Detalle: "932454622",
        Extension: "444-555",
      },
    ];
  }

  editContact(item: any) {
    this.contactSelected = item;
  }

  saveContact(): void {
    let form = (this as any).$refs.form;
    if (form.validate()) {
      this.clearContactSelected();
    }
  }

  clearContactSelected() {
    this.contactSelected = null;
  }
}
</script>

<style></style>
