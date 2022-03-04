import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IContactTypes } from "@/services/ContactTypesService/types";

export default class ContactTypesService extends BaseService {
  getAll(): IServiceResponse<Array<IContactTypes>> {
    return this.client.get("/TiposContactos");
  }
}
