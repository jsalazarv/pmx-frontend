import { IModuleMenu } from "@/store/app/types";

const mvd: IModuleMenu = {
  initials: "MVD",
  name: "Vigencia de Derechos",
  children: [
    {
      icon: "mdi-account-search",
      text: "Consulta",
      message: null,
      route: "mvd:people:searchEmployee",
    },
    {
      icon: "mdi-file-chart",
      text: "Reportes",
      message: null,
      route: "report:list",
    },
  ],
  defaultRoute: "people:searchEmployee",
};

export default mvd;
