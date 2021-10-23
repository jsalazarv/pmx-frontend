export interface IApiResponse<T> {
  Data: T;
  Message: string;
  Success: boolean;
}

export type IServiceResponse<T = unknown> = Promise<IApiResponse<T>>;
