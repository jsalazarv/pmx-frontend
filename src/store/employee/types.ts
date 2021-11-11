import { ICountry } from "@/services/CountryService/types";
import { IState } from "@/services/StateService/types";
import { IMunicipality } from "@/services/MunicipalityService/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";
import { IGender } from "@/services/GenderService/types";

export interface IAddress {
  IdDomicilio: number;
  IdMunicipio: number;
  CodigoPostal: string;
  Localidad: string;
  Colonia: string;
  Calle: string;
  NumeroExterior: string;
  NumeroInterior: string;
  Manzana: string;
  Lote: string;
  Baja: boolean;
  Pais: ICountry;
  Estado: IState;
  Municipio: IMunicipality;
}

export interface IFiliation {
  IdSolicitudFiliacion: number | null;
  IdPersona: number;
  Folio: string;
  FechaSolicitud: string;
  IdCentro: number;
  IdSeccionSindicato: number;
  Referencia: string;
  Justificacion: string; // TODO: Verify with backend
  Observaciones: string;
  Baja: boolean;
  Empleado: unknown; // TODO: Verify with backend
  CentroTrabajo: unknown; // TODO: Verify with backend
}

export interface IEmployee {
  IdPersona: number;
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  FechaNacimiento: string;
  Sexo: string;
  RFC: string;
  IndRenapo: boolean;
  Fotografia: string;
  FotografiaMIME: string;
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
  DpCrip: string;
  DpMigracion: number;
  DpNatura: number;
  DpCertifica: number;
  Archivo: string;
  PfechaAlta: string;
  PFolioConstancia: number;
  PEstatus: number;
  XEstatus: string;
  YEstatus: string;
  ZEstatus: string;
  Marca: string;
  CError: number;
  Observacion: string;
  DpActa: number;
  DpTomo: number;
  Genero: IGender;
  EstadoCivil: IMaritalStatus;
  Domicilio: IAddress;
}

export interface IEmployeeForm {
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
}

export interface IEmploymentDataForm {
  Folio: string;
  Referencia: string;
  IdCentro: string;
  IdSeccionSindicato: number | null;
  Observaciones: string;
  EmpresaOrganismoSolicitante: string;
  CentroDeTrabajoSolicitante: string;
  DescripcionDelCentroDeTrabajoSolicitante: string;
  IdSindicato: number | null;
}

export interface IAddressForm {
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

export interface IConfirmForm {
  Justificacion: string;
  confirmar: null | boolean;
}

export interface IEmployeeState {
  employee: IEmployeeForm;
  employmentData: IEmploymentDataForm;
  address: IAddressForm;
  confirmation: IConfirmForm;
}
