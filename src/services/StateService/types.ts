import { ICountry } from "@/services/CountryService/types";

export interface IState {
  id: number;
  idPais: number;
  idEstado: string;
  nombre: string;
  baja: boolean;
  pais: ICountry;
}
