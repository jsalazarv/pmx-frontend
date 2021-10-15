import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { IServiceResponse } from "@/services/types";
import { IMunicipality } from "@/services/MunicipalityService/types";

export default class MunicipalityService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  getAll(): IServiceResponse<Array<IMunicipality>> {
    return this.client.get("/Municipios");
  }

  getByStateId(
    stateId: number,
    params = {}
  ): IServiceResponse<Array<IMunicipality>> {
    return this.client.get(`/Municipios/${stateId}/Estado`, params);
  }
}
