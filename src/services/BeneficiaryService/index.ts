import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  IBeneficiary,
  IValidityRightsResponse,
} from "@/services/BeneficiaryService/types";

export default class BeneficiaryService extends BaseService {
  getValidityRights(
    assigmentNumber: number | null,
    employeeTypeId: number
  ): IServiceResponse<IValidityRightsResponse> {
    return this.client.get(
      `/Derechohabientes/ObtenerVigenciaDerechosPorEmpleado/${assigmentNumber}/${employeeTypeId}`
    );
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
