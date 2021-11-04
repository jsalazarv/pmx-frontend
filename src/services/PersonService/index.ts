import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  ICreatePersonRequest,
  IPersonValidationResponse,
} from "@/services/PersonService/types";

export default class PersonService extends BaseService {
  findByCurp(
    curp: string,
    idEmployeeType: number | null,
    params = {}
  ): IServiceResponse<IPersonValidationResponse> {
    return this.client.get(
      `/Personas/${curp}/Curp/TipoEmpleado/${idEmployeeType}`,
      params
    );
  }

  /*create(
    data: ICreatePersonRequest,
    params = {}
  ): IServiceResponse<IPersonValidationResponse> {
    const form = new FormData();

    return this.client.post(`/Personas/Alta`, data, {
      params,
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
      },
    });
  }*/

  async create(
    data: ICreatePersonRequest
  ): IServiceResponse<IPersonValidationResponse> {
    const formData = new FormData();

    for (const property in data) {
      formData.append(property, data[property]);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    return this.client.post(`/Personas/Alta`, formData, config);
  }
}
