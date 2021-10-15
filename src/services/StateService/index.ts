import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { IServiceResponse } from "@/services/types";
import { IState } from "@/services/StateService/types";

export default class StateService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  getAll(): IServiceResponse<Array<IState>> {
    return this.client.get("/Estados");
  }

  getByCountryId(
    countryId: number,
    params = {}
  ): IServiceResponse<Array<IState>> {
    return this.client.get(`/Estados/${countryId}/Pais`, params);
  }
}
