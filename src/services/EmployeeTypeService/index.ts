import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IEmployeeType } from "@/services/EmployeeTypeService/types";

export default class EmployeeTypeService extends BaseService {
  getAll(): IServiceResponse<Array<IEmployeeType>> {
    return this.client.get("/TiposEmpleado");
  }
}
