<template>
  <v-navigation-drawer v-model="sidebar.open" clipped app dark>
    <v-col cols="12">
      <v-select
        :items="modulesMenu"
        :value="menu.name"
        item-text="name"
        :return-object="true"
        solo
        @change="switchMenu"
      ></v-select>
    </v-col>
    <v-divider class="mx-5"></v-divider>
    <v-list dense>
      <template v-for="item in menu.children">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
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
            :to="{ name: item.route }"
            exact
          >
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ child.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-item
          v-else
          :key="item.text"
          link
          :to="{ name: item.route }"
          exact
        >
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
import { IModuleMenu, ISidebar } from "@/store/app/types";
import appMenu from "@/components/layouts/partials/menu";

@Component({
  name: "Sidebar",
})
export default class Sidebar extends Vue {
  modulesMenu: Array<IModuleMenu> = appMenu;

  get menu(): IModuleMenu {
    return this.$store.state.app.sidebar.currentMenu;
  }

  get sidebar(): ISidebar {
    return this.$store.state.app.sidebar;
  }

  switchMenu(selectedMenu: IModuleMenu): void {
    this.$store.dispatch("app/setCurrentMenu", selectedMenu);
    this.$router.push({ name: selectedMenu.defaultRoute });
  }
}
</script>

<style scoped></style>
