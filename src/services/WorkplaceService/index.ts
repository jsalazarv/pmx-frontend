import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IWorkplace } from "@/services/WorkplaceService/types";

export default class WorkplaceService extends BaseService {
  getByCompanyName(
    companyName: string,
    params = {}
  ): IServiceResponse<Array<IWorkplace>> {
    return this.client.get(`/CentrosTrabajo/${companyName}/Empresa`, params);
  }
}
