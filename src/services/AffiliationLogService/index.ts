import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IAffiliationLog } from "@/services/AffiliationLogService/types";

export default class AffiliationLogService extends BaseService {
  getAll(): IServiceResponse<Array<IAffiliationLog>> {
    return this.client.get("/BitacoraFiliacion");
  }
}
