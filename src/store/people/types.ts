export interface IPerson {
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Sexo: string;
  FechaNacimiento: string;
  Nacionalidad: string;
  AnioRegistro: number | null;
  IdMunicipioRegistro: number | null;
  IdEntidadNacional: string;
  IdEntidadEmisora: string;
  IdTipoEmpleado: number | null;
}

export interface IEmploymentData {
  Referencia: string;
  EmpresaOrganismoSolicitante: string;
  CentroDeTrabajoSolicitante: string;
  DescripcionDelCentroDeTrabajoSolicitante: string;
  IdSindicato: number | null;
  IdSeccionSindical: number | null;
  Observaciones: string;
}

export interface IAddress {
  IdPais: number | null;
  IdEstado: number | null;
  IdMunicipio: number | null;
  CodigoPostal: string;
  Colonia: string;
  NumeroInterior: string;
  NumeroExterior: string;
  Manzana: string;
  Lote: string;
}

export interface IPeopleState {
  person: IPerson;
  employmentData: IEmploymentData;
  address: IAddress;
}
