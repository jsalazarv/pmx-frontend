import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#9E2244",
        secondary: "#bc955a",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        aceptar: "#A42145",
        cancelar: "#bc955a",
        verde: "#4CAF50",
        amarillo: "#FBC02D",
        rojo: "#E53935",
        gris: "#90A4AE",
      },
      dark: {
        primary: "#9E2244",
        secondary: "#bc955a",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        aceptar: "#A42145",
        cancelar: "#bc955a",
        verde: "#4CAF50",
        amarillo: "#FBC02D",
        rojo: "#E53935",
        gris: "#90A4AE",
      },
    },
  },
});
