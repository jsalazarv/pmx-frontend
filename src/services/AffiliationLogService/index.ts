import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  IAffiliationLog,
  IAffiliationLogReport,
} from "@/services/AffiliationLogService/types";
import { AxiosResponse } from "axios";

export default class AffiliationLogService extends BaseService {
  search(params = {}): IServiceResponse<Array<IAffiliationLog>> {
    const payload = { exportar: false };
    const config = { params };
    return this.client.post("/BitacoraFiliacion/Filtro", payload, config);
  }

  export(data: IAffiliationLogReport, params = {}): Promise<AxiosResponse> {
    const payload = { ...data, exportar: true };
    return this.client.post("/BitacoraFiliacion/Filtro", payload, {
      params,
      responseType: "blob",
    });
  }

  getAll(): IServiceResponse<Array<IAffiliationLog>> {
    return this.client.get("/BitacoraFiliacion");
  }
}
