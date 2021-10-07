import Service from "@/services/Service";
import AuthorizationRequestInterceptor from "@/http/interceptors/request/AuthorizationRequestInterceptor";
import LoggerResponseInterceptor from "@/http/interceptors/response/LoggerResponseInterceptor";

export default class RenapoPeopleService extends Service {

    constructor(protected connection = "apiRenapoPeople",
                protected requestInterceptors = [AuthorizationRequestInterceptor],
                protected responseInterceptors = [LoggerResponseInterceptor]) {
        super(connection, requestInterceptors, responseInterceptors);
    }

    find(id: any, params = {}) {
        return this.client.get(`${id}/Curp`, params);
    }
}