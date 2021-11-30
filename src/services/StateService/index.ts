import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IState } from "@/services/StateService/types";

export default class StateService extends BaseService {
  getAll(): IServiceResponse<Array<IState>> {
    return this.client.get("/Estados");
  }

  getByCountryId(
    countryId: number | null,
    params = {}
  ): IServiceResponse<Array<IState>> {
    return this.client.get(`/Estados/${countryId}/Pais`, params);
  }
}
