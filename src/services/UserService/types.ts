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
  Modulo: IModule;
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
  IdUsuario: number;
  IdEmpleado: number;
  IdTipoEmpleado: number;
  TipoEmpleado: string;
  NombreCompleto: string;
  Estado: string;
  FechaInicio: string;
  FechaTermino: string;
  PrimeraSesion: string;
  UltimaSesion: string;
  Contador: number;
  Baja: boolean;
  Perfil: IProfile;
  Roles: IRoles;
}
