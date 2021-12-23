import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IDepartament } from "@/services/DepartmentService/types";

export default class WorkplaceService extends BaseService {
  getByWorkplace(idWorkplace: number): IServiceResponse<Array<IDepartament>> {
    return this.client.get(
      `/Departamentos/ObtenerDepartamentosPorCentro/${idWorkplace}`
    );
  }
}
