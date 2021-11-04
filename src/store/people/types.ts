export interface IPerson {
  IdTipoEmpleado: number | null;
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  Sexo: string;
  RFC: string;
  EdoCivil: string;
  Fotografia: string;
  /*Nacionalidad: string;
  AnioRegistro: number | null;
  IdMunicipioRegistro: number | null;
  IdEntidadNacional: string;
  IdEntidadEmisora: string;*/
}

export interface IEmploymentData {
  Folio: string;
  Referencia: string;
  IdCentro: string;
  IdSeccionSindicato: number | null;
  Observaciones: string;
  /*EmpresaOrganismoSolicitante: string;
  CentroDeTrabajoSolicitante: string;
  DescripcionDelCentroDeTrabajoSolicitante: string;
  IdSindicato: number | null;*/
}

export interface IAddress {
  /*IdPais: number | null;
  IdEstado: number | null;*/
  IdMunicipio: number | null;
  CodigoPostal: string;
  Localidad: string;
  Colonia: string;
  Calle: string;
  NumeroExterior: string;
  NumeroInterior: string;
  Manzana: string;
  Lote: string;
}

export interface IPeopleState {
  person: IPerson;
  employmentData: IEmploymentData;
  address: IAddress;
}
