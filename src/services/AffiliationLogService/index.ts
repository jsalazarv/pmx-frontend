import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IAffiliationLog } from "@/services/AffiliationLogService/types";

export default class AffiliationLogService extends BaseService {
  search(query = {}): IServiceResponse<Array<IAffiliationLog>> {
    return this.client.get("/BitacoraFiliacion/Filtro", query);
  }

  getAll(): IServiceResponse<Array<IAffiliationLog>> {
    return this.client.get("/BitacoraFiliacion/Filtro");
  }
}
