import { ValidationObserver, ValidationProvider } from "vee-validate";

export interface ISnackbarProps {
  visible: boolean;
  message: string | null;
  color?: string | null;
}

export type IValidationObserver = InstanceType<typeof ValidationObserver>;
export type IValidationProvider = InstanceType<typeof ValidationProvider>;
