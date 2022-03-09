export interface IModule {
  IdModulo: number;
  Nombre: string;
  Siglas: string;
  Descripcion: string;
  Baja: boolean;
}

export interface IRoles {
  IdRol: number;
  IdModulo: number;
  Clave: string;
  Descripcion: string;
  Modulo: IModule | null;
  Baja: boolean;
}

export interface IProfile {
  IdPerfil: number;
  Nombre: string;
  Siglas: string;
  Descripcion: string;
  Estado: string;
  Baja: boolean;
  Roles: IRoles;
}

export interface IUser {
  IdUsuario: number | null;
  IdEmpleado: number | null;
  IdTipoEmpleado: number | null;
  TipoEmpleado: string;
  IdPersona: number | null;
  NombreCompleto: string;
  Estado: string;
  FechaInicio: string;
  FechaTermino: string;
  PrimeraSesion: string;
  UltimaSesion: string;
  Contador: number | null;
  Baja: boolean;
  Perfil: IProfile;
  Roles: IRoles | null;
}

export interface IUserRequest {
  IdUsuario: number | null;
  IdEmpleado: number | null;
  IdPerfil: number | null;
  IdTipoEmpleado: number | null;
  Nombres: string | null;
  FechaInicio: string;
  FechaTermino: string;
}

export interface IUserFilterRequest {
  IdEmpleado: number | null;
  IdPerfil: number | null;
  Nombre: string | null;
  Estado: string | null;
}