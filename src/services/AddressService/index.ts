import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import {
  IAddress,
  IAddressPerson,
  IAddressPersonSave,
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

  getAddressesbyPerson(
    idPerson: number | null
  ): IServiceResponse<Array<IAddressPerson>> {
    return this.client.get(
      `/Domicilios/${idPerson}/ObtenerDomiciliosPorPersonaId`
    );
  }

  createAddresPerson(
    addressPerson: IAddressPersonSave
  ): IServiceResponse<IAddressPersonSave> {
    return this.client.post(
      "/Domicilios/CrearDomiciliosPersona",
      addressPerson
    );
  }

  assignAddressPerson(
    addressPerson: IAddressPersonSave
  ): IServiceResponse<IAddressPersonSave> {
    return this.client.put(
      `Domicilios/AsignarDomicilioPersona/${addressPerson.id_domicilio_persona}`,
      addressPerson
    );
  }
}
