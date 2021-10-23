import { ICountry } from "@/services/CountryService/types";

export interface IState {
  IdEstado: string;
  IdPais: number;
  Nombre: string;
  Baja: boolean;
  Pais: ICountry;
}
