export interface IEmpleado {
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

export type IEmpleadoRenapo = IEmpleado;
export type IEmpleadoMFE = IEmpleado;

export interface ICountries {
  id: number;
  clave: string;
  nombre: string;
  nacionalidad: string;
  baja: boolean;
}

export interface IStoreEmpleados {
  isLoading: boolean;
  dialogOpen: boolean;
  empleado: IEmpleado;
  typesOfEmployees: Array<ITypesOfEmployees>;
  dataRenapo: IEmpleadoRenapo | null;
  dataMFE: IEmpleadoMFE | null;
  countries: Array<ICountries>;
}
