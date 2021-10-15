import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { IServiceResponse } from "@/services/types";
import { ICountry } from "@/services/CountryService/types";

export default class CountryService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  getAll(): IServiceResponse<Array<ICountry>> {
    return this.client.get("/Paises");
  }
}
