export interface IContact {
  IdContacto: number;
  IdPersona: number;
  IdTipoContacto: number;
  Tipo: string;
  Extension: string | null;
  Detalle: string;
  Referencia: string | null;
  Baja: false | null;
}
