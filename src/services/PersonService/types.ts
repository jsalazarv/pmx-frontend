import { IAddress, IEmploymentData, IPerson } from "@/store/people/types";

export interface IRenapoData {
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Sexo: string;
  FechaNacimiento: string;
  Nacionalidad: string;
  AnioRegistro: number;
  IdMunicipioRegistro: number;
  IdEntidadNacional: string;
  IdEntidadEmisora: string;
}

export interface IMfeData {
  IdPersona: number;
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
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

export interface IPersonValidationResponse {
  Renapo: IRenapoData;
  MFE: IMfeData;
}

export interface ICreatePersonRequest
  extends IPerson,
    IAddress,
    IEmploymentData {}
