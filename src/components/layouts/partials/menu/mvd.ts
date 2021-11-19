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
  ],
  defaultRoute: "people:searchEmployee",
};

export default mvd;
