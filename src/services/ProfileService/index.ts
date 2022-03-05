import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IProfile } from "@/services/ProfileService/types";

export default class ProfileService extends BaseService {
  getAll(): IServiceResponse<Array<IProfile>> {
    return this.client.get(`Perfil`);
  }

  getById(id: number): IServiceResponse<IProfile> {
    return this.client.get(`Perfil/${id}`);
  }
}
