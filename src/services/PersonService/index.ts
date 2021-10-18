import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IPersonValidationResponse } from "@/services/PersonService/types";

export default class PersonService extends BaseService {
  findByCurp(
    curp: string,
    params = {}
  ): IServiceResponse<IPersonValidationResponse> {
    return this.client.get(`/Personas/${curp}/Curp`, params);
  }
}
