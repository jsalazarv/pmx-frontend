export interface IPerson {
  curp: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  fechaNacimiento: string;
  nacionalidad: string;
  anioRegistro: number | null;
  idMunicipioRegistro: number | null;
  idEntidadNacional: string;
  idEntidadEmisora: string;
}

export interface ITypesOfEmployees {
  id: number;
  nombre: string;
  sigla: string;
}

export interface ICountries {
  id: number;
  clave: string;
  nombre: string;
  nacionalidad: string;
  baja: boolean;
}

export interface IPeopleState {
  person: IPerson;
  countries: Array<ICountries>;
}
