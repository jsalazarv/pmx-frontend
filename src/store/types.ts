import { IAppState } from "@/store/app/types";
import { IUserStore } from "@/store/user/types";
import { IConsultationStore } from "@/store/consultation/types";
import { IEmployeeState } from "@/store/employee/types";


export interface IRootState {
  app: IAppState;
  user: IUserStore;
  consulta : IConsultationStore;
  empleados: IEmployeeState;
}
