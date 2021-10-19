import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { ISyndicateSection } from "@/services/SyndicateSectionService/types";

export default class SyndicateSectionService extends BaseService {
  getBySyndicateId(
    syndicateId: number,
    params = {}
  ): IServiceResponse<Array<ISyndicateSection>> {
    return this.client.get(
      `/SeccionesSindicato/${syndicateId}/Sindicato`,
      params
    );
  }
}
