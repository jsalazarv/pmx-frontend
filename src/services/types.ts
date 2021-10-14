import { AxiosResponse } from "axios";

export interface IApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type ServiceReponse<T = unknown> = Promise<
  AxiosResponse<IApiResponse<T>>
>;
