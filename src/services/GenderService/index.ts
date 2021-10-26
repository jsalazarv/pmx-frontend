import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IGender } from "@/services/GenderService/types";

export default class GenderService extends BaseService {
  getAll(): IServiceResponse<Array<IGender>> {
    return this.client.get("/Generos");
  }
}
