export interface IEmpleado {
    curp: string;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    sexo: string;
    fechaNacimiento: string;
    nacionalidad: string;
    anioRegistro: number | null;
    idMunicipioRegistro: number | null;
    idEntidadNacional: string;
    idEntidadEmisora: string;
}

export interface IEmpleadoRenapo extends IEmpleado {}
export interface IEmpleadoMFE extends IEmpleado {}

export interface IStoreEmpleados {
    isLoading: boolean;
    dialogOpen: boolean;
    empleado: IEmpleado;
    dataRenapo: IEmpleadoRenapo | null;
    dataMFE: IEmpleadoMFE | null;
}


