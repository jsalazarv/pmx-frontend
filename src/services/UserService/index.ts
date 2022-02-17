import BaseService from "@/services/BaseService";
import { IApiResponse, IServiceResponse } from "@/services/types";
import { IUser } from "@/services/UserService/types";

export default class UserService extends BaseService {
  getAll(): IServiceResponse<Array<IUser>> {
    return this.client.get("/Usuarios");
  }

  findById(id: string, params = {}): Promise<IApiResponse<IUser>> {
    return this.client.get(`/Usuarios/${id}/`, params);
  }
}
