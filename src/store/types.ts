import { IAppState } from "@/store/app/types";
import { IUserStore } from "@/store/user/types";
import { IStoreEmpleados } from "@/store/people/types";

export interface IRootState {
  app: IAppState;
  user: IUserStore;
  empleados: IStoreEmpleados;
}
