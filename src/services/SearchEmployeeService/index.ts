import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { ISearchResult } from "@/services/SearchEmployeeService/types";

export default class SearchEmployeeService extends BaseService {
  getSearch(params = {}): IServiceResponse<ISearchResult[]> {
    return this.client.post("/Empleados/Buscar/", params);
  }
}
