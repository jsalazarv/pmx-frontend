import { IAppState } from "@/store/app/types";
import { IUserStore } from "@/store/user/types";
import { IPeopleState } from "@/store/people/types";
import { IConsultationStore } from "@/store/consultation/types";

export interface IRootState {
  app: IAppState;
  user: IUserStore;
  empleados: IPeopleState;
  consulta : IConsultationStore
}
