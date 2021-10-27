import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { ICompany } from "@/services/CompanyService/types";

export default class CompanyService extends BaseService {
  getAll(): IServiceResponse<Array<ICompany>> {
    return this.client.get("/Empresas");
  }
}
