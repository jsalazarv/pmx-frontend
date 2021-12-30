import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  IBeneficiary,
  IBeneficiaryRequest,
  IValidityRightsResponse,
} from "@/services/BeneficiaryService/types";

export default class BeneficiaryService extends BaseService {
  getValidityRights(
    idPerson: number,
    assigmentNumber: number,
    employeeTypeId: number
  ): IServiceResponse<IValidityRightsResponse> {
    return this.client.get(
      `/Derechohabientes/ObtenerVigenciaDerechosPorEmpleado/${idPerson}/${assigmentNumber}/${employeeTypeId}`
    );
  }

  create(beneficiary: IBeneficiaryRequest): IServiceResponse<IBeneficiary> {
    return this.client.post("/Derechohabientes", beneficiary);
  }

  getBeneficiaryByPerson(
    idPerson: number | null
  ): IServiceResponse<IBeneficiary> {
    return this.client.get(
      `/Derechohabientes/ObtenerDerechohabientePorPersona/${idPerson}`
    );
  }

  getAll(assigmentNumber: number | null): IBeneficiary[] {
    return [];
  }
}
