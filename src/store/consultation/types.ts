export interface IConsultation {
  assigmentNumber: number | null;
  employeeType: string | null;
  fullname: string | null;
  employeeTypeId: number | null;
  groupPersonal: string | null;
  areaPersonal: string | null;
  idPerson: number | null;
  departmentCenter: string;
  departmentDescription: string;
  validity: string;
  validityStatus: boolean;
}

export interface IConsultationState {
  consultation: IConsultation;
}
