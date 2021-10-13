<template>
  <v-navigation-drawer
    v-model="sidebar.open"
    clipped
    app
    :mini-variant="sidebar.miniVariant"
    dark
  >
    <v-list dense>
      <template v-for="item in menu">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(child, i) in item.children"
            :key="i"
            link
            :to="child.link"
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item v-else :key="item.text" link :to="item.link">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="item.message">
            <v-btn
              color="error"
              style="background-color: white"
              x-small
              text
              outlined
              fab
              >{{ item.message }}</v-btn
            >
          </v-list-item-action>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { ISidebar } from "@/store/app/types";

interface menu {
  icon?: string;
  "icon-alt"?: string;
  text?: string;
  model?: boolean;
  message?: null | number | string;
  link?: string;
  children?: Array<unknown>;
}

type MenuObjeto = menu;

@Component({
  name: "Sidebar",
})
export default class Sidebar extends Vue {
  menu: Array<MenuObjeto> = [
    {
      icon: "mdi-keyboard-f1",
      text: "Dashboard",
      message: 4,
      link: "inicio",
    },
    {
      icon: "mdi-keyboard-f2",
      text: "Alta",
      message: null,
      link: "alta",
    },
    {
      icon: "mdi-keyboard-f3",
      text: "Opción 3",
      message: null,
      link: "opcion3",
    },
    {
      icon: "mdi-chevron-up-box-outline",
      "icon-alt": "mdi-chevron-down-box-outline",
      text: "Opción con hijos",
      model: true,
      children: [
        {
          icon: "mdi-numeric-1-box",
          text: "Hijo 1",
          link: "/hijo1",
        },
        { icon: "mdi-numeric-2-box", text: "Hijo 2", link: "/hijo2" },
      ],
    },
  ];

  get sidebar(): ISidebar {
    return this.$store.state.app.sidebar;
  }
}
</script>

<style scoped></style>
