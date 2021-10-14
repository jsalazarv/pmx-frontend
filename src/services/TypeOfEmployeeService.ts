import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { ServiceReponse } from "@/services/types";
import { ITypesOfEmployees } from "@/store/people/types";

export default class TypeOfEmployeeService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  getTypesOfEmployees(): ServiceReponse<ITypesOfEmployees> {
    return this.client.get("/TiposEmpleado");
  }
}
