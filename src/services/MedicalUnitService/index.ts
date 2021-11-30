import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IMedicalUnit } from "@/services/MedicalUnitService/types";

export default class MedicalUnitService extends BaseService {
  getAll(): IServiceResponse<Array<IMedicalUnit>> {
    return this.client.get("/UnidadesMedicas");
  }
}