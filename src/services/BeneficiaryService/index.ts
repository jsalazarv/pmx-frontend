import BaseService from "@/services/BaseService";
// import { IServiceResponse } from "@/services/types";
import { IBeneficiaryResult } from "@/services/BeneficiaryService/types";

export default class BeneficiaryService extends BaseService {
  //   search(params = {}): IServiceResponse<ISearchResult[]> {
  //     return this.client.post("/Empleados/Buscar/", params);
  //   }

  getAll(assigmentNumber: number | null): IBeneficiaryResult[] {
    console.log(assigmentNumber);

    return [
      {
        id_derechohabiente: "1",
        nombres: "GABRIELA",
        apellido_paterno: "SANDOVAL",
        apellido_materno: "URBAN",
        curp: "MALA700306HQTRND07",
        codificacion: "Hija",
      },
      {
        id_derechohabiente: "2",
        nombres: "GABRIELA",
        apellido_paterno: "SANDOVAL",
        apellido_materno: "URBAN",
        curp: "MALA700306HQTRND07",
        codificacion: "Hija",
      },
      {
        id_derechohabiente: "3",
        nombres: "GABRIELA",
        apellido_paterno: "SANDOVAL",
        apellido_materno: "URBAN",
        curp: "MALA700306HQTRND07",
        codificacion: "Hija",
      },
      {
        id_derechohabiente: "4",
        nombres: "GABRIELA",
        apellido_paterno: "SANDOVAL",
        apellido_materno: "URBAN",
        curp: "MALA700306HQTRND07",
        codificacion: "Hija",
      },
      {
        id_derechohabiente: "5",
        nombres: "GABRIELA",
        apellido_paterno: "SANDOVAL",
        apellido_materno: "URBAN",
        curp: "MALA700306HQTRND07",
        codificacion: "Hija",
      },
    ];
  }
}
