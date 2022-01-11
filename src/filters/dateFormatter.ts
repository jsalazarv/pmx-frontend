import Vue from "vue";
import moment from "moment";

Vue.filter(
  "dateFormatted",
  function (date: string, inputDate = "DD/MM/YYYY", format = "DD/MM/YYYY") {
    return date ? moment(date, inputDate).format(format) : "";
  }
);
