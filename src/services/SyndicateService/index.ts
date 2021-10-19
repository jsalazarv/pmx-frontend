import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { ISyndicate } from "@/services/SyndicateService/types";

export default class SyndicateService extends BaseService {
  getAll(): IServiceResponse<Array<ISyndicate>> {
    return this.client.get("/Sindicatos");
  }
}
