import AbstractService from "@/http/AbstractService";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";

export default class BaseService extends AbstractService {
  constructor(
    protected connection = "api",
    protected requestInterceptors = [AuthorizationRequestInterceptor],
    protected responseInterceptors = []
  ) {
    super(connection, requestInterceptors, responseInterceptors);
  }
}
