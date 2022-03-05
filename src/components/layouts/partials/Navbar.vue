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
    <v-menu offset-y left max-width="320">
      <template v-slot:activator="{ on }">
        <v-btn x-small depressed fab v-on="on" class="white--text">
          <v-avatar size="40">
            <v-img
              icon
              src="https://randomuser.me/api/portraits/men/4.jpg"
            ></v-img>
          </v-avatar>
        </v-btn>
      </template>

      <v-card class="">
        <v-list class="py-0 rounded-bl-xl" color="primary">
          <v-list-item>
            <v-list-item-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/4.jpg`" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title class="white--text"
                >Felipe Galvan Achavarria</v-list-item-title
              >
              <v-list-item-subtitle class="white--text"
                >felipe_galvan_achav@pemex.com</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-monitor</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              v-html="$t('dropDownProfile.nameApplication')"
            ></v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-layers</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t("dropDownProfile.build")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-icon>
              <v-icon> mdi-clipboard-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>1009056</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ getEnvironmentName }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-phone-classic</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              >{{ $t("dropDownProfile.support") }} 555 333</v-list-item-title
            >
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item @click="logOut">
            <v-list-item-icon>
              <v-icon>mdi-login-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{
              $t("dropDownProfile.logout")
            }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-title class="text-right">
              <v-btn-toggle
                mandatory
                shaped
                active-class="btn__language--active"
                v-model="languageModel"
              >
                <v-btn
                  v-for="language in lstLanguagesSystem"
                  :key="language"
                  small
                  :value="language"
                >
                  {{ language }}
                </v-btn>
              </v-btn-toggle>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list class="py-1">
          <v-list-item>
            <v-list-item-title class="text-right">
              {{ $t("dropDownProfile.version") }} 1.0v
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
  languageModel = "";

  created(): void {
    this.languageModel = (this as any).getLanguageLocalStore;
  }

  toggleSidebar(): void {
    this.$store.dispatch("app/toggleSidebar");
  }

  logOut(): void {
    this.$store
      .dispatch("user/logout")
      .then(() => {
        this.$router.push({ name: "login" });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  get getEnvironmentName(): string {
    let isDevelopment = (this as any).$env === "development";

    return isDevelopment
      ? (this.$t("dropDownProfile.enviromentDevelopment") as string)
      : (this.$t("dropDownProfile.enviromentProduction") as string);
  }

  get lstLanguagesSystem(): string {
    return this.$store?.getters["app/getLanguages"];
  }

  @Watch("languageModel", {})
  watchChangeLanguage(newValue: string, oldValue: string) {
    (this as any).setLanguageCurrent(newValue);
  }
}
</script>

<style>
.btn__language--active {
  background: #9e2244 !important;
  color: #fff !important;
}
</style>
