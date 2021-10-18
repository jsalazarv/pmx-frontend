import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IMunicipality } from "@/services/MunicipalityService/types";

export default class MunicipalityService extends BaseService {
  getAll(): IServiceResponse<Array<IMunicipality>> {
    return this.client.get("/Municipios");
  }

  getByStateId(
    stateId: number,
    params = {}
  ): IServiceResponse<Array<IMunicipality>> {
    return this.client.get(`/Municipios/${stateId}/Estado`, params);
  }
}
