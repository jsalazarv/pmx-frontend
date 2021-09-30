<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      app
      :mini-variant="miniVariant"
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
    <v-app-bar clipped-left app dense color="black darken-3" dark>
      <v-app-bar-nav-icon
        @click.stop="(miniVariant = !miniVariant), (drawer = true)"
      ></v-app-bar-nav-icon>
      <v-toolbar-title class="pl-1"
        ><v-img
          contain
          src="@/assets/logoPemex.png"
          transition="scale-transition"
      /></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="mr-7">
            <v-badge color="error" dot>
              <v-icon size="25">mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Notificaciones</span>
      </v-tooltip>
      <v-menu offset-y left>
        <template v-slot:activator="{ on }">
          <v-btn small color="red" depressed fab v-on="on" class="white--text">
            T
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <img :src="`https://randomuser.me/api/portraits/men/4.jpg`" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>Nombre Apellido</v-list-item-title>
                <v-list-item-subtitle>correo@pemex.com</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-item @click="logOut">
              <v-list-item-icon>
                <v-icon>mdi-login-variant</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Cerrar sesión</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main class="pa-1">
      <router-view :key="$route.fullPath"></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

interface menu {
  icon?: string;
  "icon-alt"?: string;
  text?: string;
  model?: boolean;
  message?: any;
  link?: string;
  children?: any;
}

type MenuObjeto = menu;

@Component
export default class NavBar extends Vue {
  drawer: boolean = true;
  miniVariant: boolean = false;
  menu: Array<MenuObjeto> = [
    {
      icon: "mdi-keyboard-f1",
      text: "Opción 1",
      message: 4,
      link: "opcion1",
    },
    {
      icon: "mdi-keyboard-f2",
      text: "Opción 2",
      message: null,
      link: "opcion2",
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

  logOut = () => {
    this.$store
      .dispatch("logout")
      .then(() => {
        this.$router.push({ name: "Login" });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
</script>
