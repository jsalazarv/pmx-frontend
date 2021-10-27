import Vue from "vue";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { min, required } from "vee-validate/dist/rules";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

extend("required", required);
extend("min", min);
