import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IWorkPlace } from "@/services/WorkplaceService/types";

export default class WorkplaceService extends BaseService {
  getAll(): IServiceResponse<Array<IWorkPlace>> {
    return this.client.get("/CentrosTrabajo");
  }
}
