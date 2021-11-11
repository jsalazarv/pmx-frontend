export interface IApiResponse<T, M = string> {
  Data: T;
  Message: M;
  Success: boolean;
}

export type IServiceResponse<T = unknown, M = string> = Promise<
  IApiResponse<T, M>
>;
