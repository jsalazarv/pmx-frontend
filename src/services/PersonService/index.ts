import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { IServiceResponse } from "@/services/types";
import { IPersonValidationResponse } from "@/services/PersonService/types";

export default class PersonService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  findByCurp(
    curp: string,
    params = {}
  ): IServiceResponse<IPersonValidationResponse> {
    return this.client.get(`/Personas/${curp}/Curp`, params);
  }
}
