import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { ServiceReponse } from "@/services/types";
import { ICountries } from "@/store/people/types";

export default class LocationService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  getCountries(): ServiceReponse<ICountries> {
    return this.client.get("/Paises");
  }
}
