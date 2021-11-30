import { serialize } from "object-to-formdata";
import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  ICreateEmployeeResponse,
  ICreateEmployeeRequest,
  IEmployeeValidationResponse,
  IMessage,
  IRejectEmployeeRequest,
  ISearchResult,
  IConsultationResult,
} from "@/services/EmployeeService/types";

export default class EmployeeService extends BaseService {
  findByCurp(
    curp: string,
    idEmployeeType: number | null,
    params = {}
  ): IServiceResponse<IEmployeeValidationResponse, IMessage> {
    return this.client.get(
      `/Empleados/${curp}/Curp/TipoEmpleado/${idEmployeeType}`,
      params
    );
  }

  async create(
    data: ICreateEmployeeRequest
  ): IServiceResponse<ICreateEmployeeResponse> {
    const body = serialize(data);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return this.client.post(`/Empleados/Alta`, body, config);
  }

  async reject(
    data: IRejectEmployeeRequest,
    params = {}
  ): IServiceResponse<IRejectEmployeeRequest> {
    return this.client.post(`/Empleados/Rechazo`, data, { params });
  }

  search(params = {}): IServiceResponse<ISearchResult[]> {
    return this.client.post("/Empleados/Buscar/", params);
  }

  consultation(
    assigmentNumber: number | null,
    employeeTypeId: number
  ): IServiceResponse<IConsultationResult> {
    return this.client.get(
      `/Empleados/${assigmentNumber}/${employeeTypeId}/ObtenerVigenciaPorId`
    );
  }
}
