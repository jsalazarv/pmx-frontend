import AbstractService from "@/http/AbstractService";
import AuthorizationRequestInterceptor from "@/services/interceptors/request/AuthorizationRequestInterceptor";
import DataResponseInterceptor from "@/services/interceptors/response/DataResponseInterceptor";

export default class BaseService extends AbstractService {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = [DataResponseInterceptor]
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }
}
