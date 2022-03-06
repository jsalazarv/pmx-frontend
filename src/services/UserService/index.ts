import BaseService from "@/services/BaseService";
import { IApiResponse, IServiceResponse } from "@/services/types";
import { IUser, IUserRequest } from "@/services/UserService/types";

export default class UserService extends BaseService {
  getAll(): IServiceResponse<Array<IUser>> {
    return this.client.get("/Usuarios");
  }

  findById(id: string, params = {}): Promise<IApiResponse<IUser>> {
    return this.client.get(`/Usuarios/${id}/`, params);
  }

  create(user: IUserRequest){
    return this.client.post(`/Usuarios`, user);
  }

  update(user: IUserRequest){
    return this.client.put(`/Usuarios/${user.IdUsuario}`, user);
  }

  delete(id: number){
    return this.client.delete(`/Usuarios/${id}`);
  }
}
