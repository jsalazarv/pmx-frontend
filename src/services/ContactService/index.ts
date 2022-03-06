import BaseService from "@/services/BaseService";
import { IServiceResponse } from "@/services/types";
import { IContact } from "./types";

export default class ContactService extends BaseService {
  getContactsByIdPerson(idPerson: number): IServiceResponse<Array<IContact>> {
    return this.client.get(`/Contactos/${idPerson}/Persona`);
  }

  getContactsByIdUser(idUser: number): IServiceResponse<Array<IContact>> {
    return this.client.get(`/Contactos/${idUser}/Usuario`);
  }
}
