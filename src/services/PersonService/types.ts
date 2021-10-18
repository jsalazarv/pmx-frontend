export interface IRenapoData {
  curp: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: string;
  fechaNacimiento: string;
  nacionalidad: string;
  anioRegistro: number;
  idMunicipioRegistro: number;
  idEntidadNacional: string;
  idEntidadEmisora: string;
}

export interface IMfeData {
  idPersona: number;
  curp: string;
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  rfc: string;
  estadoCivil: string;
  indRenapo: boolean;
  fotografia: string;
  fechaFoto: string;
  firma: string;
  siglasEntidad: string;
  nacionalidad: string;
  dpDocumento: number;
  dpEntidad: number;
  dpFoja: number;
  dpMunicipio: number;
  dpAnio: number;
  dpLibro: number;
  dpCrip: unknown;
  dpMigracion: number;
  dpNatura: number;
  dpCertifica: number;
  archivo: string;
  pfechaAlta: string;
  pFolioConstancia: number;
  pEstatus: number;
  xEstatus: unknown;
  yEstatus: unknown;
  zEstatus: string;
  marca: unknown;
  cError: number;
  observacion: string;
  dpActa: number;
  dpTomo: number;
}

export interface IPersonValidationResponse {
  renapo: IRenapoData;
  mfe: IMfeData;
}
