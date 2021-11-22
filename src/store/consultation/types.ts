export interface IConsultation {
  assigmentNumber: number | null;
  employeeType: string | null;
  fullname: string | null;
  employeeTypeId :number | null;
}

export interface IConsultationState {
  consultation: IConsultation;
}
