import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IAffiliationLog } from "@/services/AffiliationLogService/types";

export default class AffiliationLogService extends BaseService {
  search(query = {}): IServiceResponse<Array<IAffiliationLog>> {
    console.log("QUERY:", query);
    return this.client.post("/BitacoraFiliacion/Filtro", query);
  }

  getAll(): IServiceResponse<Array<IAffiliationLog>> {
    return this.client.get("/BitacoraFiliacion");
  }
}
