import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import LoggerResponseInterceptor from "@/http/interceptors/response/LoggerResponseInterceptor";
import { AxiosResponse } from "axios";

export default class RenapoPeopleService extends Service {
  constructor(
    protected connection = "apiRenapoPeople",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = [LoggerResponseInterceptor]
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  findByCurp(curp: string, params = {}): Promise<AxiosResponse> {
    return this.client.get(`${curp}/Curp`, params);
  }
}
