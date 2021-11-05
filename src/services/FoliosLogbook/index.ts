import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IFoliosLogbook } from "@/services/FoliosLogbook/types";

export default class FoliosLogbook extends BaseService {
  getAll(): IServiceResponse<Array<IFoliosLogbook>> {
    return this.client.get("/BitacoraFolios");
  }
}
