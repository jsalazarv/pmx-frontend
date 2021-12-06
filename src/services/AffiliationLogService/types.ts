export interface IAffiliationLog {
  IdBitacoraFiliacion: number;
  IdEmpleado: number;
  IdTipoEmpleado: number;
  TipoEmpleado: string;
  TipoMovimiento: string;
  Motivo: string;
  CamposModificados: string;
  DatosAnteriores: string;
  DatosNuevos: string;
  FechaRealizacion: string;
  Baja: boolean;
}

export interface IIAffiliationLogReportProperties {
  Nombre: string;
  Personalizado: string;
}

export interface IAffiliationLogReport {
  NombreReporte: string;
  Propiedades: Array<IIAffiliationLogReportProperties>;
}
