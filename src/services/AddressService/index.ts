import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  IAddresPersonResponse,
  IAddress,
  IAddressPerson,
} from "@/services/AddressService/types";

export default class AddressService extends BaseService {
  create(address: IAddress): IServiceResponse<IAddress> {
    return this.client.post("/Domicilios", address);
  }

  get(id: number | null): IServiceResponse<IAddress> {
    return this.client.get(`/Domicilios/${id}`);
  }

  edit(address: IAddress): IServiceResponse<IAddress> {
    return this.client.put(`/Domicilios/${address.IdDomicilio}`, address);
  }

  getCurrentAddress(idPerson: number | null): IServiceResponse<IAddress> {
    return this.client.get(`/Domicilios/ObtenerActual/${idPerson}`);
  }

  createAddresPerson(
    addressPerson: IAddressPerson
  ): IServiceResponse<IAddressPerson> {
    return this.client.post(
      "/Domicilios/CrearDomiciliosPersona",
      addressPerson
    );
  }

  getHeadlineAddresses(
    idBenficiary: number | null
  ): IServiceResponse<IAddresPersonResponse[]> {
    return this.client.get(
      `Domicilios/ObtenerHistoricoPorTitular/${idBenficiary}`
    );
  }
}
