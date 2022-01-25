import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  IBeneficiary,
  IBeneficiaryRequest,
  ITitularBeneficiaryRequest,
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

  getAll(idBeneficiary: number | null): IServiceResponse<Array<IBeneficiary>> {
    return this.client.get(
      `Derechohabientes/ObtenerTodosIdTitular/${idBeneficiary}`
    );
  }

  createTitular(
    beneficiaryTitular: ITitularBeneficiaryRequest
  ): IServiceResponse<number> {
    return this.client.post(
      "/Derechohabientes/AltaTitular",
      beneficiaryTitular
    );
  }

  getMedicalUnit(idBeneficiary: number | null): IServiceResponse<number> {
    return this.client.get(
      `Derechohabientes/ObtenerIdUnidadMedica/${idBeneficiary}`
    );
  }

  updateMedicalUnit(
    idBeneficiary: number | null,
    idMedicalUnit: number | null
  ): IServiceResponse<number> {
    return this.client.put(
      `Derechohabientes/ActualizarUnidadMedica/${idBeneficiary}/${idMedicalUnit}`
    );
  }
}
