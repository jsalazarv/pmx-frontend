export interface IContact {
  IdContacto: number | null;
  IdPersona: number;
  IdTipoContacto: number;
  Tipo: string;
  Extension: string | null;
  Detalle: string;
  Referencia: string | null;
  Baja: false | null;
}

export interface IContactRequest {
  IdContacto: number | null;
  IdPersona: number;
  IdTipoContacto: number;
  Extension: string | null;
  Detalle: string;
  Referencia: string | null;
}
