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

export interface IStoreEmpleados {
    isLoading: boolean;
    empleado: IEmpleado;
}
