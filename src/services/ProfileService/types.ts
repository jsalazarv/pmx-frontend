import { IRoles } from "@/services/RolesService/types";

export interface IProfile {
  IdPerfil: number;
  Nombre: string;
  Siglas: string;
  Descripcion: string;
  Estado: string;
  Baja: boolean;
  Roles: Array<IRoles>;
}
