import { IEmployeeType } from "@/services/EmployeeTypeService/types";
import { IEmployee } from "@/store/employee/types";

export interface IProofAssignmentReport {
  IdEmpleado?: number;
  Estado?: unknown;
  TipoEmpleado: Partial<IEmployeeType>;
  Persona: Partial<IEmployee>;
}
