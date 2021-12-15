import Vue from "vue";

Vue.filter("cleanObject", function (obj: Record<string, unknown>) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
});
