import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import { IServiceResponse } from "@/services/types";
import { ITypesOfEmployees } from "@/store/people/types";

export default class EmployeeTypeService extends Service {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }

  getAll(): IServiceResponse<Array<ITypesOfEmployees>> {
    return this.client.get("/TiposEmpleado");
  }
}
