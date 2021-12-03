import { IModuleMenu } from "@/store/app/types";

const mfe: IModuleMenu = {
  initials: "MFE",
  name: "Módulo de Filiación de Empleados",
  children: [
    {
      icon: "mdi-keyboard-f1",
      text: "Dashboard",
      message: null,
      route: "dashboard",
    },
    {
      icon: "mdi-keyboard-f2",
      text: "Alta",
      message: null,
      route: "people:create",
    },
    {
      icon: "mdi-keyboard-f3",
      text: "Consulta",
      message: null,
      route: "people:consultation",
    },
    {
      icon: "mdi-keyboard-f4",
      text: "Folios asignación",
      message: null,
      route: "folios:list",
    },
    {
      icon: "mdi-keyboard-f5",
      text: "Constancia de asignación",
      message: null,
      route: "proof:assignment",
    },
    {
      icon: "mdi-keyboard-f6",
      text: "Bitácora",
      message: null,
      route: "affiliationLog:list",
    },
  ],
  defaultRoute: "dashboard",
};

export default mfe;
