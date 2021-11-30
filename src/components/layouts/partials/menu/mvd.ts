import { IModuleMenu } from "@/store/app/types";

const mvd: IModuleMenu = {
  initials: "MVD",
  name: "Módulo de Vigencia de Derechos",
  children: [
    {
      icon: "mdi-keyboard-f1",
      text: "Consulta",
      message: null,
      route: "people:searchEmployee",
    },
    {
      icon: "mdi-keyboard-f2",
      text: "Reportes",
      message: null,
      route: "report:list",
    },
  ],
  defaultRoute: "people:searchEmployee",
};

export default mvd;
