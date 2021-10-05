import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from "axios";
import VueAxios from "vue-axios";
import Vuelidate from 'vuelidate';
import "./directives";

Vue.use(VueAxios, Axios);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
