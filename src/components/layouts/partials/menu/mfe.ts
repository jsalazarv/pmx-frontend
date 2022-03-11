import { IModuleMenu } from "@/store/app/types";
import i18n from "@/lang";

const mfe: IModuleMenu = {
  initials: "MFE",
  name: i18n.t("sidebar.mfe.moduleName") as string,
  children: [
    {
      icon: "mdi-view-dashboard",
      text: i18n.t("sidebar.mfe.items.home") as string,
      message: null,
      route: "dashboard",
    },
    {
      icon: "mdi-account-plus",
      text: i18n.t("sidebar.mfe.items.employeeRegistration") as string,
      message: null,
      route: "people:create",
    },
    {
      icon: "mdi-account-search",
      text: i18n.t("sidebar.mfe.items.employeeConsultation") as string,
      message: null,
      route: "people:list",
    },
    {
      icon: "mdi-card-account-details",
      text: i18n.t("sidebar.mfe.items.assignmentFolios") as string,
      message: null,
      route: "folios:list",
    },
    {
      icon: "mdi-file-account",
      text: i18n.t("sidebar.mfe.items.proofOfAssignment") as string,
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
