import { IAppState } from "@/store/app/types";
import { IUserStore } from "@/store/user/types";
import { IEmployeeState } from "@/store/employee/types";
import { IPersonValidationState } from "@/store/person/types";

export interface IRootState {
  app: IAppState;
  user: IUserStore;
  empleados: IEmployeeState;
  person: IPersonValidationState;
}
