import { IModuleMenu } from "@/store/app/types";

const mfe: IModuleMenu = {
  initials: "MFE",
  name: "Módulo de Filiación de Empleados",
  children: [
    {
      icon: "mdi-view-dashboard",
      text: "Inicio",
      message: null,
      route: "dashboard",
    },
    {
      icon: "mdi-account-plus",
      text: "Alta",
      message: null,
      route: "people:create",
    },
    {
      icon: "mdi-account-search",
      text: "Consulta",
      message: null,
      route: "people:list",
    },
    {
      icon: "mdi-card-account-details",
      text: "Folios asignación",
      message: null,
      route: "folios:list",
    },
    {
      icon: "mdi-file-account",
      text: "Constancia de asignación",
      message: null,
      route: "proof:assignment",
    },
    {
      icon: "mdi-clipboard-list",
      text: "Bitácora",
      message: null,
      route: "affiliationLog:list",
    },
  ],
  defaultRoute: "dashboard",
};

export default mfe;
