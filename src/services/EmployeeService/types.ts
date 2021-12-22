import {
  IEmploymentDataForm,
  IEmployeeForm,
  IAddressForm,
  IEmployee,
  IFiliation,
} from "@/store/employee/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { ISyndicate } from "@/services/SyndicateService/types";
import { ISyndicateSection } from "@/services/SyndicateSectionService/types";
import { IWorkplace } from "@/services/WorkplaceService/types";

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

export interface IMessage {
  Regla: string;
  Texto: string;
}

export interface IEmployeeValidationResponse {
  Renapo: IRenapoData;
  MFE: IMfeData;
}

export enum EmployeeValidationRule {
  PERSONA_TIPOS_EMPLEADO_NO_EXISTE = "PERSONA_TIPOS_EMPLEADO_NO_EXISTE",
  PERSONA_OTROS_TIPO_EMPLEADO_EXISTE = "PERSONA_OTROS_TIPO_EMPLEADO_EXISTE",
  PERSONA_TIPO_EMPLEADO_EXISTE = "PERSONA_TIPO_EMPLEADO_EXISTE",
  NO_REGISTRO_RENAPO_Y_MFE = "NO_REGISTRO_RENAPO_Y_MFE",
}

export interface ICreateEmployeeRequest
  extends IEmployeeForm,
    IAddressForm,
    IEmploymentDataForm {}

export interface ICreateEmployeeResponse {
  IdEmpleado: number;
  Estado: unknown; //TODO: Verify with backend
  Baja: boolean;
  TipoEmpleado: IEmployeeType;
  Persona: IEmployee; //TODO: Check if it should be renamed with "Employee"
  Filiacion: IFiliation;
  Sindicato: ISyndicate;
  SeccionSindical: ISyndicateSection;
  CentroTrabajo: IWorkplace;
}

export interface IShowEmployee {
  IdEmpleado?: number;
  Estado?: unknown;
  TipoEmpleado?: Partial<IEmployeeType>;
  Persona?: Partial<IEmployee>;
  Filiacion?: Partial<IFiliation>;
  Sindicato?: Partial<ISyndicate>;
  SeccionSindical?: Partial<ISyndicateSection>;
  CentroTrabajo?: Partial<IWorkplace>;
}

export interface IUpdateEmployeeRequest {
  Id: number;
  IdPersona: number;
  Curp: string;
  Nombres: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Sexo: string;
  RFC: string;
  Fotografia: string;
  IdSolicitudFiliacion: number;
  IdCentro: number;
  IdSeccionSindicato?: number;
  Referencia: string;
  Observaciones: string;
  IdTipoEmpleado: number;
  IdEmpleado: number;
}

export interface IRejectEmployeeRequest {
  IdTipoEmpleado: number | null;
  Curp: string;
  Justificacion: string;
}

export interface IDeleteEmployeeRequest {
  IdEmpleado: number;
  Motivo: string;
}

export interface ISearch {
  id_tipo_emp: string | null;
  nombres: string | null;
  ap_paterno: string | null;
  curp: string | null;
  ap_materno: string | null;
  num_empleado: string | null;
}

export interface ISearchResult {
  tipo_emp_desc: string;
  Nombres: string;
  ap_paterno: string;
  ap_materno: string;
  curp: string;
  num_empleado: number;
  tipo_empleado: number;
  id_persona: number;
}

export interface IConsultationResult {
  RC: string;
  centro_depto: string;
  descripcion: string;
  vigencia: string;
  estado_vigencia: string;
}
