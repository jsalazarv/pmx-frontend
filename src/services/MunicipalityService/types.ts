import { IState } from "@/services/StateService/types";

export interface IMunicipality {
  IdMunicipio: number;
  IdEstado: number;
  Clave: string;
  Nombre: string;
  Baja: boolean;
  Estado: IState;
}
