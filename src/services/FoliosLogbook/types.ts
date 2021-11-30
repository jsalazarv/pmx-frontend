import { IGender } from "@/services/GenderService/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";
import { ICountry } from "@/services/CountryService/types";
import { IState } from "@/services/StateService/types";
import { IMunicipality } from "@/services/MunicipalityService/types";

export interface IFoliosLogbook {
  IdFolioAsignacion: number;
  Estatus: string;
  IdEmpleado: number;
  Motivo: string;
  Persona: {
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
    Domicilio: {
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
    };
  };
}

export interface IFoliosLogbookQueryFilter {
  IdFolioAsignacion: string;
}
