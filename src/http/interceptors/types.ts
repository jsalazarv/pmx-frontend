import {AxiosRequestConfig, AxiosResponse} from "axios";

export type IRequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>;
export type IResponseInterceptor = (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;