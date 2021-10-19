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

export interface IEmploymentData {
  referencia: string;
  empresaOrganismoSolicitante: string;
  centroDeTrabajoSolicitante: string;
  descripcionDelCentroDeTrabajoSolicitante: string;
  idSindicato: number | null;
  idSeccionSindical: number | null;
  observaciones: string;
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

export interface IPeopleState {
  person: IPerson;
  employmentData: IEmploymentData;
  address: IAddress;
}
