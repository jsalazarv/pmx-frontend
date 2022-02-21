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

export interface IPersonData {
  IdPersona: number | null;
  Curp: string;
  Nombres: string;
  ApellidoMaterno: string;
  ApellidoPaterno: string;
  FechaNacimiento: string;
  Sexo: string;
  IndRenapo: boolean;
  Baja: boolean;
}

export interface IPersonValidationResponse {
  Renapo: IRenapoData;
  PortalTransaccional: IPersonData;
  DerechohabienteExiste: boolean;
  RenapoDisponible: boolean;
}
