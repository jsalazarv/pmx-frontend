import BaseService from "@/services/BaseService";
import { AxiosResponse } from "axios";
import { IApplicantsDataReport } from "@/services/ReportingService/types";

export default class ReportingService extends BaseService {
  export(data: IApplicantsDataReport, params = {}): Promise<AxiosResponse> {
    return this.client.post("/Reportes/ConstanciaAsignacion", data, {
      params,
      responseType: "blob",
    });
  }
}
