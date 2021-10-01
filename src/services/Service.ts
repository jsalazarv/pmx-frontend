import {IRequestInterceptor, IResponseInterceptor} from "@/http/interceptors/types";
import HttpClient from "@/http/HttpClient";
import ClientFactory from "@/http/ClientFactory";
import config from "@/config";

export default abstract class Service {
    static readonly DEFAULT_CONNECTION: string = config.api.default;

    protected client: HttpClient;

    constructor(
        protected connection: string = Service.DEFAULT_CONNECTION,
        protected requestInterceptors: IRequestInterceptor[] = [],
        protected responseInterceptors: IResponseInterceptor[] = [],
    ) {
        this.client = this.buildClient();
        this.applyRequestInterceptors(this.requestInterceptors);
        this.applyResponseInterceptors(this.responseInterceptors);
    }

    buildClient(): HttpClient {
        return ClientFactory.buildByName(this.connection);
    }

    /**
     * Apply interceptors before each request
     * @private
     */
    applyRequestInterceptors(interceptors: Array<IRequestInterceptor> = []): void {
        const requestInterceptors = [...this.getRequestInterceptors(), ...interceptors];

        requestInterceptors.forEach((interceptor) => {
            this.client.applyInterceptorRequest(interceptor);
        });
    }

    /**
     * Apply interceptors before each request
     * @private
     */
    applyResponseInterceptors(interceptors: Array<IResponseInterceptor> = []): void {
        const responseInterceptors = [...this.getResponseInterceptors(), ...interceptors];

        responseInterceptors.forEach((interceptor) => {
            this.client.applyInterceptorResponse(interceptor);
        });
    }

    /**
     * Get an array of request interceptors
     * @return {IRequestInterceptor[]}
     */
    getRequestInterceptors(): IRequestInterceptor[] {
        return this.requestInterceptors;
    }

    /**
     * Get an array of response interceptors
     * @return {IResponseInterceptor[]}
     */
    getResponseInterceptors(): IResponseInterceptor[] {
        return this.responseInterceptors;
    }
}