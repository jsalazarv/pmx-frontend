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

export interface IAddress {
  idPais: number | null;
  idEstado: number | null;
  idMunicipio: number | null;
  codigoPostal: string;
  colonia: string;
  numeroInterior: string;
  numeroExterior: string;
  manzana: string;
  lote: string;
}

export interface ITypesOfEmployees {
  id: number;
  nombre: string;
  sigla: string;
}

export interface IPeopleState {
  person: IPerson;
  address: IAddress;
}
