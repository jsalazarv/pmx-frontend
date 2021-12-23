export interface IValidityRightsResponse {
  GrupoPersonal: string;
  AreaPersonal: string;
  CentroDepto: string;
  DepartamentoDescripcion: string;
  IdCentro: number | null;
  IdDepartamento: number | null;
  Vigencia: string;
  EstadoVigencia: boolean;
}

export interface ITitularBeneficiaryRequest {
  IdPersona: number | null;
  IdCentro: number | null;
  IdDepartamento: number | null;
  Vigencia: string | null;
}

export interface IBeneficiary {
  IdDerechohabiente: number | null;
  IdPersona: number | null;
  IdDerTitular: number | null;
  IdFamiliar: number | null;
  IdUMedica: number | null;
  TipoDer: string | null;
  Vigencia: number | null;
  Estado: number | null;
  Observaciones: number | null;
  UsuarioCrea: number | null;
  IdCentro: number | null;
  IdDepartamento: number | null;
}

export interface IPerson {
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  Sexo: string;
  Rfc: string;
  Edad: string;
}

export interface IAddress {
  IdDomicilio: number | null;
  IdPais: number | null;
  IdEstado: number | null;
  IdMunicipio: number | null;
  Localidad: string;
  CodigoPostal: string;
  Colonia: string;
  Calle: string;
  NumeroInterior: string;
  NumeroExterior: string;
  Manzana: string;
  Lote: string;
}

export interface IBeneficiaryRequest {
  IdDerechohabiente: number | null;
  IdPersona: number | null;
  IdDerTitular: number | null;
  IdFamiliar: number | null;
  IdUMedica: number | null;
  TipoDer: string | null;
  Vigencia: number | null;
  Estado: number | null;
  Observaciones: number | null;
  UsuarioCrea: number | null;
  IdCentro: number | null;
  IdDepartamento: number | null;
  FechaNacimiento: string | null;
  Edad: string | null;
  Person: IPerson;
  Address: IAddress;
}
