import { serialize } from "object-to-formdata";
import BaseService from "@/services/BaseService";
import { IApiResponse, IServiceResponse } from "@/services/types";
import {
  ICreateEmployeeResponse,
  ICreateEmployeeRequest,
  IEmployeeValidationResponse,
  IMessage,
  IRejectEmployeeRequest,
  ISearchResponse,
  IDeleteEmployeeRequest,
  IUpdateEmployeeRequest,
} from "@/services/EmployeeService/types";

export default class EmployeeService extends BaseService {
  getAll(): IServiceResponse<Array<ICreateEmployeeResponse>> {
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

  findById(
    id: string,
    params = {}
  ): Promise<IApiResponse<ICreateEmployeeResponse>> {
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

  async update(id: number, data: IUpdateEmployeeRequest) {
    const body = serialize(data);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return this.client.put(`/Empleados/${id}/Alta`, body, config);
  }

  async reject(
    data: IRejectEmployeeRequest,
    params = {}
  ): IServiceResponse<IRejectEmployeeRequest> {
    return this.client.post(`/Empleados/Rechazo`, data, { params });
  }

  async delete(
    data: IDeleteEmployeeRequest
  ): IServiceResponse<IDeleteEmployeeRequest> {
    return this.client.post(`/Empleados/Cancelacion`, data);
  }

  search(params = {}): IServiceResponse<ISearchResponse[]> {
    return this.client.post("/Empleados/Buscar/", params);
  }
}
