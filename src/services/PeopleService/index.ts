import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IPersonValidationResponse } from "@/services/PeopleService/types";

export default class EmployeeService extends BaseService {
  validateCurpRenapo(
    curp: string,
    params = {}
  ): IServiceResponse<IPersonValidationResponse> {
    return this.client.get(`/Personas/Curp/${curp}/RENAPO`, params);
  }
}
