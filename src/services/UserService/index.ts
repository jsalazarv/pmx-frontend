import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IUser } from "@/services/UserService/types";

export default class UserService extends BaseService {
  getAll(): IServiceResponse<Array<IUser>> {
    return this.client.get("/Usuarios");
  }
}
