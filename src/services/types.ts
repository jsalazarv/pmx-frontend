export interface IApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export type IServiceResponse<T = unknown> = Promise<IApiResponse<T>>;
