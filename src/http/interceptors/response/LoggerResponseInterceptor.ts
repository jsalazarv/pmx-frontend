import {IResponseInterceptor} from "@/http/interceptors/types";

const LoggerResponseInterceptor: IResponseInterceptor = (response) => {
    console.log("LOGGER RESPONSE INTERCEPTOR: ", response);
    return response;
}

export default LoggerResponseInterceptor;