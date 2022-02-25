export interface IValidityRightsResponse {
  GrupoPersonal: string | null;
  AreaPersonal: string | null;
  CentroDepto: string | null;
  DepartamentoDescripcion: string | null;
  IdCentro: number | null;
  IdDepartamento: number | null;
  Vigencia: string | null;
  EstadoVigencia: boolean | null;
  TipoEmpleadoDescripcion: string | null;
  Nombres: string | null;
  ApellidoPaterno: string | null;
  ApellidoMaterno: string | null;
  Curp: string | null;
  IdDerechohabiente: number | null;
  Sexo: string;
}

export interface ITitularBeneficiaryRequest {
  IdEmpleado: number | null;
  IdTipoEmpleado: number | null;
  IdPersona: number | null;
  IdCentro: number | null;
  IdDepartamento: number | null;
  IdDerechohabiente: number | null;
  Vigencia: string | null;
}

export interface IBeneficiary {
  IdDerechohabiente: number;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Curp: string;
  Parentesco: string;
  Vigencia: string;
  IndIncapacidad: boolean;
  CveBajal: boolean;
}

export interface IBeneficiaryCustom {
  IdDerechohabiente: number | null;
  IdPersona: number;
  IndRenapo: boolean | null;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Curp: string;
  IdFamiliar: number | null;
  FechaNacimiento: string;
  IdGenero: string;
  IdUnidadMedica: 100;
  Observaciones: string;
  IdDomicilio: number | null;
  Vigencia: string;
  IndIncapacidad: boolean | null;
  CveBajal: boolean | null;
}

export interface IBeneficiaryResponse {
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
  IdPersona: number | null;
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  Edad: string | null;
  Sexo: string;
  Rfc: string;
  EstadoCivil: string;
  IndRenapo: boolean | null;
  Fotografia: string;
  FechaFoto: string;
  Firma: string;
  SiglasEntidad: string;
  Nacionalidad: string;
  DpDocumento: number;
  DpEntidad: number;
  DpFoja: number;
  DpMunicipio: number;
  DpAnio: number;
  DpLibro: number;
  DpCrip: unknown;
  DpMigracion: number;
  DpNatura: number;
  DpCertifica: number;
  Archivo: string;
  PfechaAlta: string;
  PFolioConstancia: number;
  PEstatus: number;
  XEstatus: unknown;
  YEstatus: unknown;
  ZEstatus: string;
  Marca: unknown;
  CError: number;
  Observacion: string;
  DpActa: number;
  DpTomo: number;
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
  TipoDer: string;
  Vigencia: string;
  Estado: string;
  Observaciones: string;
  IndIncapacidad: boolean | null;
  Persona: IPerson;
  Domicilio: IAddress;
  IdDomicilioExistente: number | null;
}

export enum EnumValidityValidations {
  INVALID_CHILDRENS = "INVALID_CHILDRENS",
  INVALID_BROTHERS = "INVALID_BROTHERS",
  VALID_VALIDITY = "VALID_VALIDITY",
}
