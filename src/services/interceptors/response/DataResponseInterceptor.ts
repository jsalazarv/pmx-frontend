import { IResponseInterceptor } from "@/services/interceptors/types";

/**
 * This method will remove the axios data property because pemex api is responding whit another data prop
 * This avoid to access data like: response.data.data
 * PEMEX API RESPONSE SCHEMA:
 * {
 *    data: T;
 *    message: string;
 *    success: boolean;
 * }
 * @param response
 * @constructor
 */
const DataResponseInterceptor: IResponseInterceptor = (response) => {
  return response.data;
};

export default DataResponseInterceptor;
