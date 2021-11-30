export interface IAddress {
  IdDomicilio: number | null;
  IdPais: number | null;
  IdEstado: number | null;
  IdMunicipio: number | null;
  Localidad: string;
  CodigoPostal: string;
  Colonia: string;
  Calle: string;
  NumeroInterior: string;
  NumeroExterior: string;
  Manzana: string;
  Lote: string;
  Baja: boolean | null;
}

export interface IAddressPerson {
  id_domicilio_persona: number | null;
  id_domicilio: number | null;
  domicilio_desc: string;
  baja: boolean | null;
}

export interface IAddressSelect {
  street: string;
  idAddress: number | null;
}

export interface IAddressPersonSave {
  id_domicilio_persona: number | null;
  id_domicilio: number | null;
  id_persona: number | null;
  usuario_sesion: number | null;
  baja: boolean | null;
}
