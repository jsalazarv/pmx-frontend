export interface IConsultation {
  assigmentNumber: number | null;
  employeeType: string | null;
  fullname: string | null;
  employeeTypeId: number | null;
  rc: string;
  id_person: number | null;
  department: string;
  departmentDescription: string;
  validity: string;
  ValidityStatus: string;
}

export interface IConsultationState {
  consultation: IConsultation;
}
