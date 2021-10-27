import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IMaritalStatus } from "@/services/MaritalStatusService/types";

export default class MaritalStatusService extends BaseService {
  getAll(): IServiceResponse<Array<IMaritalStatus>> {
    return this.client.get("/EstadoCivil");
  }
}
