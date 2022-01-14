import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";

import { IEmployeeStatus, IEmployeeTypesEmployee } from "./types";

export default class DashboardService extends BaseService {
  totalPeople(): IServiceResponse<number> {
    return this.client.get("/Personas/Total");
  }

  totalRequestMembership(): IServiceResponse<number> {
    return this.client.get("/SolicitudesFiliacion/Total");
  }

  totalEmployee(): IServiceResponse<number> {
    return this.client.get("/Empleados/Total");
  }

  totalEmployeeCurrent(): IServiceResponse<number> {
    return this.client.get("/Empleados/Total/Hoy");
  }

  totalEmployeeStatus(): IServiceResponse<Array<IEmployeeStatus>> {
    return this.client.get("/Empleados/Total/Estatus");
  }

  totalEmployeeByTypeEmployee(): IServiceResponse<
    Array<IEmployeeTypesEmployee>
  > {
    return this.client.get("/Empleados/Total/TiposEmpleado");
  }
}
