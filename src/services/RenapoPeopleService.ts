import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { AxiosResponse } from "axios";

export default class RenapoPeopleService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  findByCurp(curp: string, params = {}): Promise<AxiosResponse> {
    return this.client.get(`/Personas/${curp}/Curp`, params);
  }
}
