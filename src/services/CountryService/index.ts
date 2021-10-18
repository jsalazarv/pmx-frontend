import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { ICountry } from "@/services/CountryService/types";

export default class CountryService extends BaseService {
  getAll(): IServiceResponse<Array<ICountry>> {
    return this.client.get("/Paises");
  }
}
