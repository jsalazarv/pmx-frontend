<template>
  <v-app-bar clipped-left app dense color="black darken-3" dark>
    <v-app-bar-nav-icon @click="toggleSidebar"></v-app-bar-nav-icon>
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
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Navbar extends Vue {
  toggleSidebar(): void {
    this.$store.dispatch("app/toggleSidebar");
  }

  logOut(): void {
    this.$store
      .dispatch("user/logout")
      .then(() => {
        this.$router.push({ name: "Login" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style scoped></style>
