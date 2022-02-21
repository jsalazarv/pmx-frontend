import Vue from "vue";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  localize,
} from "vee-validate";
import en from "vee-validate/dist/locale/en.json";
import es from "vee-validate/dist/locale/es.json";
import {
  min,
  numeric,
  required,
  max,
  required_if,
} from "vee-validate/dist/rules";
import i18n from "@/lang/index";

Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

localize({
  en,
  es,
});

localize("es");

extend("required", required);
extend("required_if", required_if);
extend("min", min);
extend("max", max);
extend("numeric", numeric);
extend("validityrule", (value, args: any) => {
  const valueDate = `${value.split("/")[2]}-${value.split("/")[1]}-${
    value.split("/")[0]
  } `;
  const currentDate = new Date().toDateString();
  const validityDate = new Date(valueDate).toDateString();
  if (new Date(validityDate) >= new Date(currentDate)) {
    return true;
  }
  return `{_field_} ${i18n.t(
    "employeeConsultation.labels.validations.dateGreaterThanToday"
  )}`;
});
