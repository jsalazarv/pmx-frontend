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
  getAll(): IServiceResponse<ICreateEmployeeResponse> {
    return this.client.get(`/Empleados`);
  }

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

  findById(id: string, params = {}) {
    return this.client.get(`/Empleados/${id}/`, params);
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

  consultation(assigmentNumber: number | null): IConsultationResult {
    return {
      RC: "RC",
      centro_depto: "centro-depto",
      descripcion: "descripcion",
      vigencia: "17/11/2021",
      estado_vigencia: "estado_vigencia",
    };
  }
}
