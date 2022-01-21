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
  IdPersona: number;
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  Edad: string | null;
  Sexo: string;
  Rfc: string;
  EstadoCivil: string;
  IndRenapo: boolean;
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
  IdPersona: number;
  IdDerTitular: number | null;
  IdFamiliar: number | null;
  IdUMedica: number | null;
  TipoDer: string;
  Vigencia: string;
  Estado: string;
  Observaciones: string;
  IndIncapacidad: boolean;
  Persona: IPerson;
  Domicilio: IAddress;
}
