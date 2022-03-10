import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IContact, IContactRequest } from "./types";

export default class ContactService extends BaseService {
  getContactsByIdPerson(idPerson: number): IServiceResponse<Array<IContact>> {
    return this.client.get(`/Contactos/${idPerson}/Persona`);
  }

  getContactsByIdUser(idUser: number): IServiceResponse<Array<IContact>> {
    return this.client.get(`/Contactos/${idUser}/Usuario`);
  }

  generateContactsByIdPerson(
    idPerson: number,
    contacts: Array<IContactRequest>
  ): IServiceResponse<Array<IContact>> {
    return this.client.post(
      `/Contactos/${idPerson}/Persona/GenerarColeccion`,
      contacts
    );
  }

  generateContactsByIdUser(
    idUser: number,
    contacts: Array<IContactRequest>
  ): IServiceResponse<Array<IContact>> {
    return this.client.post(
      `/Contactos/${idUser}/Usuario/GenerarColeccion`,
      contacts
    );
  }
}
