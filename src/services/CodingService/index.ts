import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { ICoding } from "@/services/CodingService/types";

export default class CodingService extends BaseService {
  getAll(
    idHeadline: number | null,
    idBeneficiary: number | null
  ): IServiceResponse<Array<ICoding>> {
    return this.client.get(
      `/Familiares?idTitular=${idHeadline}${ idBeneficiary != null ? '&idDerechohabiente='+idBeneficiary : ''}`
    );
  }
}
