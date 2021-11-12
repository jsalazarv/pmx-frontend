import Vue from "vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import es from "vee-validate/dist/locale/es.json";
import { min, required } from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

localize({
  en,
  es,
});

localize("es");

extend("required", required);
extend("min", min);
