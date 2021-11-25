import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IFoliosLogbook } from "@/services/FoliosLogbook/types";

export default class FoliosLogbook extends BaseService {
  search(query = {}): IServiceResponse<Array<IFoliosLogbook>> {
    return this.client.get("/BitacoraFolios/Filtro", query);
  }

  getAll(): IServiceResponse<Array<IFoliosLogbook>> {
    return this.client.get("/BitacoraFolios/Filtro");
  }

  findById(id: number | null, params = {}): IServiceResponse<IFoliosLogbook> {
    return this.client.get(`/BitacoraFolios/${id}`, params);
  }
}
