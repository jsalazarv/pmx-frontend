import { IState } from "@/services/StateService/types";

export interface IMunicipality {
  id: number;
  idEstado: number;
  clave: string;
  nombre: string;
  baja: boolean;
  estado: IState;
}
