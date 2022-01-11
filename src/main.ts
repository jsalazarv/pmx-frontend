import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Axios from "axios";
import VueAxios from "vue-axios";
import "./directives";
import "/src/plugins/veevalidate";
import i18n from "@/lang";
import "./filters/dataCleaner";
import "./filters/dateFormatter";

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
