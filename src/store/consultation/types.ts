export interface IConsultation {
  assigmentNumber: number | null;
  employeeType: string | null;
  fullname: string | null;
}

export interface IConsultationState {
  consultation: IConsultation;
}
