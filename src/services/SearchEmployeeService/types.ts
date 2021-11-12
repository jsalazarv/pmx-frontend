export interface ISearch {
  id_tipo_emp: string | null;
  nombres: string | null;
  ap_paterno: string | null;
  curp: string | null;
  ap_materno: string | null;
  num_empleado: string | null;
}

export interface ISearchResult {
  tipo_emp_desc: string;
  Nombres: string;
  ap_paterno: string;
  ap_materno: string;
  curp: string;
  num_empleado: number;
}
