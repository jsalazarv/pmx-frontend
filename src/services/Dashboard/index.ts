import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";

import { IEmployeeStatus, IEmployeeTypesEmployee } from "./types";

export default class DashboardService extends BaseService {
  totalPersonas(): IServiceResponse<number> {
    return this.client.get("/Personas/Total");
  }

  totalSolicitudAfiliaciones(): IServiceResponse<number> {
    return this.client.get("/SolicitudesFiliacion/Total");
  }

  totalEmpleados(): IServiceResponse<number> {
    return this.client.get("/Empleados/Total");
  }

  totalEmpleadosHoy(): IServiceResponse<number> {
    return this.client.get("/Empleados/Total/Hoy");
  }

  totalEmpleadosEstatus(): IServiceResponse<Array<IEmployeeStatus>> {
    return this.client.get("/Empleados/Total/Estatus");
  }

  totalEmpleadosPorTiposEmpleado(): IServiceResponse<
    Array<IEmployeeTypesEmployee>
  > {
    return this.client.get("/Empleados/Total/TiposEmpleado");
  }
}
