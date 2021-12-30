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
  IdDomicilioPersona: number | null;
  IdDomicilio: number | null;
  IdPersona: number | null;
}

export interface IAddresPersonResponse {
  IdDomicilioPersona: number | null;
  IdDomicilio: number | null;
  DomicilioDescripcion: string | null;
}