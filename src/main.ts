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
import { NotifyMixin, LanguageMixin } from "./mixins";

Vue.mixin(NotifyMixin);
Vue.mixin(LanguageMixin);

Vue.use(VueAxios, Axios);

Vue.prototype.$env = process.env.NODE_ENV;

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
